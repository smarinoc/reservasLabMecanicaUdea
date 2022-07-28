import { useMutation } from '@apollo/client';
import Button from '@components/Button';
import Input from '@components/Input';
import SelectInput from '@components/SelectInput';
import { REGISTER_USER } from 'graphql/mutations/user';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const form = () => {
    const { data: session, status } = useSession()
    const [documentType, setDocumentType] = useState("")
    const [document, setDocument] = useState("")
    const [rol, setRol] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const DocumentTypeOpc = [
        {
            value: "cédula de ciudadania", label: "Cédula de ciudadania"
        },
        {
            value: "documento de identidad", label: "Documento de identidad"
        },
        {
            value: "cédula de extranjería", label: "Cédula de extranjería"
        },
    ]
    const rolsOpc = [
        {
            value: "estudiante", label: "Estudiante"
        },
        {
            value: "profesor", label: "Profesor"
        },
        {
            value: "otro", label: "Otro"
        },
    ]

    const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

    const onSubmit = async (e) => {
        e.preventDefault(false)
        await registerUser({
            variables: {
                data: {
                    email: session.user.email,
                    documentType,
                    document,
                    rol,
                    phoneNumber
                }
            }
        })
    }

    if (status == 'loading') {
        return <></>
    }
    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col drop-shadow-sm border-2 px-8 w-[876px] mx-auto gap-5 py-3 bg-white items-center'>
                <Input name="email" value={session.user.email} disabled={true} text="Correo" type="email" />
                <Input name="fullName" value={session.user.name} disabled={true} text="Nombre" type="text" />
                <SelectInput onChange={(e) => {
                    setDocumentType(e.value)
                }} options={DocumentTypeOpc} text="Tipo de documento" name="documentType" />
                <Input name="document" onChange={(e) => {
                    setDocument(e.target.value)
                }} value={document} placeholder="1029478372" text="Documento" type="text" />
                <SelectInput onChange={(e) => {
                    setRol(e.value)
                }} options={rolsOpc} text="Rol" name="rol" />
                <Input name="phoneNumber" onChange={(e) => {
                    setPhoneNumber(e.target.value)
                }} value={phoneNumber} placeholder="321233498" text="Número de telefono" type="tel" />
                <Button isSubmit={true} text="Registrar" w="w-[300px]" />
            </div>
        </form>
    );
};

export default form;  