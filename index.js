const crearNuevaReserva = (reserva) => {
  //const db = firebaseDatabase...
  
  //Referencias a collections
  const reservasCollection = db.collections('reservas');
  
  //Rango del 23 de Octubre de 10 am a 12pm
  //Tu creas tu rango dependiendo el horario que necesites
  const rangoHoraDoc = reservasCollection.doc('10232020_10am12pm');
  
  db.runTransaction = async (transaction) => {
    
    //Primero verificamos el total del contador antes de guardar una reserva
    //En caso que el contador sea mayor a 5 no se podra agregar ningun registro
    const rangoDoc = await transaction.get(rangoHoraDoc);
    
    if (rangoDoc.data()?.total >= 5) {
      console.log("Ya no puedo guardar mas reservas.");
      return;
    }
    
    const contador = firebase.firestore.FieldValue.increment(1);
    
    //Procedo a guardar una reserva
    transaction.set(rangoHoraDoc.doc(), reserva)
    
    //Procedo a actualizar la propiedad contador
    transaction.set(rangoHoraDoc, { total: contador}, { merge: true })
  }
  .catch(error => {
    console.log("Algo sucedio: " + error)
  })
}
