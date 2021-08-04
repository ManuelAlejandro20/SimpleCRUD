const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const url = 'mongodb://localhost/testdatabase'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.listen(3000, () => {
    console.log('Servidor listo...')
})

app.post('/add', (req, res) => {
    const usuario = new UsuarioModel({
        Nombre:req.body.name,
        Username:req.body.username,
        Edad:req.body.age,
        Pais:req.body.country,
        Rol:req.body.rol,
        Password:req.body.password        
    })
    usuario.save()
    .then(doc => {
        console.log('TODO OK...', doc)
        res.json({response: 'success'})
    }) 
    .catch(err =>{
        console.log('Error al insertar', err.message)
        res.json({response: 'error'})
    })   
})



app.get('/users', (req,res) => {
    //UsuarioModel.find({}, 'Nombre Username')
    UsuarioModel.find()
    .then(doc => {
        res.json({response: 'success', data: doc})
    })
    .catch(err =>{
        console.log('Error al consultar elementos...')
        res.json({response: 'error'})
    })
})

app.get('/update/:id/:username', (req, res) => {
    const id = req.params.id
    const username = req.params.username
    UsuarioModel.updateOne({_id: id},
    {
        $set:{
            Username: username
        }
    })
    .then(doc => {
        res.json({response: 'success', data: doc})
    })
    .catch(err =>{
        console.log('Error al actualziar elementos...', err.message)
        res.json({response: 'failed'})
    })    
})

app.get('/delete/:id', (req, res) => {
    const id = req.params.id
    UsuarioModel.deleteOne({_id: id})
    .then(doc => {
        res.json({response: 'success', data: doc})
    })
    .catch(err =>{
        console.log('Error al actualziar elementos...', err.message)
        res.json({response: 'failed'})
    })    
})

//--------------------------------------------------------------------

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then( () => console.log('Conectado a MongoDB'))
.catch( (e) => console.log('Error de conexion: ' + e))

const usuarioSchema = mongoose.Schema({
    Nombre:String,
    Username:String,
    Edad:Number,
    Pais:String,
    Rol:String,
    Password:String    
}, {versionKey:false})

const UsuarioModel = mongoose.model('usuarios', usuarioSchema)

