import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Animated, FlatList, Touchable, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function Busca() {
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState(false);
    const [busca, setBusca] = useState(false);
    const [edicao, setEdicao] = useState(false);
    const [clienteId, setClienteId] = useState(0);
    const [clienteNome, setClienteNome] = useState();
    const [clienteEmail, setClienteEmail] = useState();
    const [clienteGenere, setClienteGenere] = useState();
    const [deleteResposta, setResposta] = useState(false);

    async function getClientes() {
        await fetch('http://10.139.75.35/api/Client/GetAllPClients', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => setClientes(json))
            .catch(err => setError(true));
    }

    async function getCliente(id) {
        console.log(id)
        await fetch('http://10.139.75.35/api/Client/GetClientId/' + id, {
            method: 'GET',
            headers: {
                'content-type': 'application/json; charset-UTF-8',
            },
        })
            .then((response) => response.json())
            .then(json => {
                setClienteId(json.clientId);
                setClienteNome(json.clientName);
                setClienteEmail(json.clientEmail);
                setClienteGenere(json.clientGenere);
            });
    }

    async function editClient() {
        console.log(clienteId);
        await fetch('http://10.139.75.35/api/Client/UpdateClient/' + clienteId, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json; charset-UTF-8',
            },
            body: JSON.stringify({
                clientId: clienteId,
                clientEmail: clienteEmail,
                clientGenere: clienteGenere,
                clientName: clienteNome
            })
        })
            .then((response) => response.json())
            .then(json => console.log(json))
            .catch(err => console.log(err));
        getClientes();
        setEdicao(false);
    }

    function showAlert(id, clientenome) {
        Alert.alert(
            '',
            'Deseja realmente excluir esse cliente?',
            [
                { text: "Sim", onPress: () => deleteClientes(id, clientenome) },
                { text: "Não", onPress: () => ('') },
            ],
            { cancelable: false }
        );
    }

    async function deleteClientes(id, clientenome) {
        await fetch('http://10.139.75.35/api/Client/DeleteClient/' + id, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(json => setResposta(json))
            .catch(err => setError(true));

        if (deleteResposta == true) {
            Alert.alert(
                '',
                'Cliente ' + clientenome + 'excluído com sucesso',
                [
                    { text: '', onPress: () => ('') },
                    { text: 'Ok', onPress: () => ('') },
                ],
                { cancelable: false }
            );
            getClientes();
        }
        else {
            Alert.alert(
                '',
                'Cliente ' + clientenome + 'não foi excluído',
                [
                    { text: '', onPress: () => ('') },
                    { text: 'Ok', onPress: () => ('') },
                ],
                { cancelable: false }
            );
            getClientes();

        }
    };

    useEffect(() => {
        getClientes();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getClientes();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <TextInput
                    style={styles.search}
                    placeholder="Buscar usuarios"
                    placeholderTextColor="white"
                    TextInput={busca}
                    onChangeText={(digitado) => setBusca(digitado)}
                />
            </View>


            {edicao == false ?
                <FlatList
                    style={styles.flat}
                    data={clientes}
                    keyExtractor={(item) => item.clientId}
                    renderItem={({ item }) => (
                        <Text style={styles.text}>
                            {item.clientName}
                            <TouchableOpacity style={styles.btnEdit} onPress={() => { setEdicao(true); getCliente(item.clientId) }}>
                                <Text style={styles.btnLoginText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnDelete} onPress={() => showAlert(item.clientId, item.clientName)}>
                                <Text style={styles.btnLoginText}>Excluir</Text>
                            </TouchableOpacity>
                        </Text>
                    )}
                />
                :
                <View style={styles.editar}>
                    <TextInput
                        inputMode="text"
                        style={styles.input}
                        value={clienteNome}
                        onChangeText={(digitado) => setClienteNome(digitado)}
                        placeholderTextColor='white'
                    />
                    <TextInput
                        inputMode="email"
                        style={styles.input}
                        value={clienteEmail}
                        onChangeText={(digitado) => setClienteEmail(digitado)}
                        placeholderTextColor='white'
                    />
                    <TextInput
                        inputMode="text"
                        style={styles.input}
                        value={clienteGenere}
                        onChangeText={(digitado) => setClienteGenere(digitado)}
                        placeholderTextColor='white'
                    />
                    <TouchableOpacity style={styles.btnCreate} onPress={() => editClient()}>
                        <Text style={styles.btnLoginText}>SALVAR</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#191919",
    },
    text: {
        padding: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ecf0f1',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchBox: {
        width: "100%",
        height: 100,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    search: {
        width: "96%",
        height: 60,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 8,
        padding: 10,
        color: "white"
    },
    btnEdit: {
        backgroundColor: '#27ae60',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    btnDelete: {
        backgroundColor: '#e74c3c',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    btnLoginText: {
        color: '#ecf0f1',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    editar: {
        width: 300,
        marginTop: 20,
        padding: 20,
        backgroundColor: '#ecf0f1',
        borderRadius: 10,
    },
    input: {
        height: 45,
        borderColor: '#bdc3c7',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        color: '#191919',
    },
    btnCreate: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
})