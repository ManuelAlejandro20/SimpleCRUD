const mongoose = require('mongoose')
const url = 'mongodb://localhost/testdatabase'

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then( () => console.log('Conectado a MongoDB'))
.catch( (e) => console.log('Error de conexion: ' + e))

const personaSchema = mongoose.Schema({
    Nombre:String,
    Edad:Number,
    Pais:String
}, {versionKey:false})

const PersonaModel = mongoose.model('personas', personaSchema)

//Mostrar
const mostrar = async () => {
    const personas = await PersonaModel.find()
    console.log(personas)
}

//Crear
const crear = async (nombre, edad, pais) => {
    const persona = new PersonaModel({
        Nombre: nombre,
        Edad: edad,
        Pais: pais
    })
    const resultado = await persona.save()
    console.log(resultado)
}

//Editar
const actualizar = async(id, nombre, pais)=>{
    const persona = await PersonaModel.updateOne({_id:id},
    {
        $set:{
            Nombre: nombre,
            Pais: pais,
        }
    })
}

//Borrar
const eliminar = async (id) => {
    const persona = await PersonaModel.deleteOne({_id:id})
    console.log(persona)
}

mostrar()