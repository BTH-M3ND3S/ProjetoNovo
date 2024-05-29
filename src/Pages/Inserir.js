import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react';
import React from 'react'

export default function Inserir() {
  const [clienteNome, setClienteNome] = useState();
  const [clienteEmail, setClienteEmail] = useState();
  const [clienteGenere, setClienteGenere] = useState();

  async function InsertClient() {
    await fetch('http://10.139.75.35/api/Client/InsertClient/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset-UTF-8',
      },
      body: JSON.stringify({
        clientEmail: clienteEmail,
        clientGenere: clienteGenere,
        clientName: clienteNome
      })
    })
      .then((response) => response.json(), 
      setClienteEmail(''), 
      setClienteNome(''), 
      setClienteGenere('')
      )

      .then(json => console.log(json))
      .catch(err => console.log(err));
    getClientes();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cadastrar um cliente</Text>
      <TextInput
        inputMode="text"
        style={styles.input}
        value={clienteNome}
        onChangeText={(digitado) => setClienteNome(digitado)}
        placeholderTextColor='gray'
        placeholder='Nome do Cliente'
      />
      <TextInput
        inputMode="email"
        style={styles.input}
        value={clienteEmail}
        onChangeText={(digitado) => setClienteEmail(digitado)}
        placeholderTextColor='gray'
        placeholder='Email do cliente'
      />
      <TextInput
        inputMode="text"
        style={styles.input}
        value={clienteGenere}
        onChangeText={(digitado) => setClienteGenere(digitado)}
        placeholderTextColor='gray'
        placeholder='Gênero do Cliente'
      />
      <TouchableOpacity onPress={() => {InsertClient()
        Alert.alert("Cadastro feito com sucesso!")
      }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#333",
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: 300,
    height: 45,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
