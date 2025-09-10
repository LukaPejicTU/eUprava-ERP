import React from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Button  from "antd/lib/button";
import notification from 'antd/lib/notification';
import { DocumentService } from "../services/DocumentService";
import { Upload } from "antd";

export interface FormValues {
    title: string;
    file: File;
}

const DocumentForm: React.FC = () => {
    

    const [form] = Form.useForm<FormValues>();

    const onFinish = async (values: { title: string; file: any[] }) => {
        
        if (!values.file || values.file.length === 0) {
            notification.error({
                message: 'Greška',
                description: 'Molimo odaberite dokument za upload.'
            });
            return;
        }

        try {      
            const fileUpload = values.file[0].originFileObj as File;

            await DocumentService.uploadDocument(values.title, fileUpload);

            notification.success({
                message: 'Uspješan upload',
                description: 'Dokument je uspješno dodan.'
            });
            form.resetFields();

        } catch (error) {
            notification.error({
                message: 'Greška',
                description: 'Došlo je do greške prilikom dodavanja dokumenta.'
            });
            console.error('Greška prilikom dodavanja dokumenta:', (error as any).response);
        }
    }

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    return (
        <Form
            onFinish={onFinish}
            layout="vertical"
        >
            <Form.Item
                name="title"
                label="Naziv"
                rules={[{required: true, message: 'Naziv je obavezan'}]}
            >
                <Input placeholder="Unesize naziv" />    
            </Form.Item>    
            <Form.Item
                name="file"
                label="Dokument"
                rules={[{required: true, message: 'Molimo odaberite datoteku'}]}
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload
                    maxCount={1}
                    beforeUpload={() => false}
                >
                    <Button>Odaberi datoteku</Button>
                </Upload>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Dodaj dokument
                </Button>
            </Form.Item>
        </Form>
    );

};

export default DocumentForm;