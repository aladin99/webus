import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import TextArea from 'antd/lib/input/TextArea';
import { Input, message } from 'antd';
import { MailOutlined, UserOutlined } from '@ant-design/icons';


// Kontakt administrator
// Emailjs.com
// npm i @emailjs/browser

export const ContactUs = () => {
    const form = useRef();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState('')

    const sendEmail = (e) => {
        e.preventDefault();
        // Kodovi se nalaze na sajtu
        emailjs.sendForm('service_leueslv', 'template_n3sdp27', form.current, 'Fam7t3ec-5rGwrY8o')
            .then(() => {
                message.success('Poruka je uspešno poslata');
                console.log(emailjs);
            }, (error) => {
                message.error({ success: false, message: error.message });
            });

        setTimeout(() => {
            setUsername('')
            setEmail('')
            setMsg('')
        }, 800);
    };

    return (

        <form ref={form} onSubmit={sendEmail} layout="vertical">
            <label>Vaše ime i prezime:</label><br />
            <Input value={username} prefix={<UserOutlined className="site-form-item-icon" />} onChange={e => setUsername(e.target.value)} className='forName' type="text" name="user_name" placeholder='Upišite Vaše ime i prezime' required /><br />
            <label>Email:</label><br />
            <Input value={email} onChange={e => setEmail(e.target.value)} className='forEmail' placeholder='primer@gmail.com' prefix={<MailOutlined className="site-form-item-icon" />} type="email" name="user_email" required /><br />
            <label>Pišite nam:</label><br />
            <TextArea value={msg} onChange={e => setMsg(e.target.value)} className='textArea' placeholder='Pitanja, primedbe...' name='message' rows={4} required /><br /><br />
            <Input className='send-message' type="submit" value="Pošalji" disabled={!username || !email || !msg} />
        </form>
    );
};
