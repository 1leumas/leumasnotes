import { Container, Form, Avatar } from './styles';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../hooks/auth'
import avatarPlaceholder from '../../assets/avatar_placeholder.svg'
import {api} from '../../services/api'

export function Profile() {
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    async function handleUpdate() {
        const updated = {
            name,
            email,
            password: newPassword,
            old_password: password
        };

        const userUpdated = Object.assign(updated, user)

        await updateProfile({ user: userUpdated, avatarFile });
    }

    function handleChangeAvatar(event) {
        const files = event.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            setAvatarFile(file);

            const imagePreview = URL.createObjectURL(file);
            setAvatar(imagePreview);
        }
    }

    return (
        <Container>
            <header>
                <Link to="/">
                    <FiArrowLeft />
                </Link>
            </header>

            <Form>
                <Avatar>
                    <img src={avatar} alt="user" onLoad={handleChangeAvatar} />
                    <label htmlFor="avatar">
                        <FiCamera />
                        <input id="avatar" type="file" onChange={handleChangeAvatar} />
                    </label>
                </Avatar>

                <Input
                    placeholder="Name"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input
                    placeholder="Current Password"
                    type="password"
                    icon={FiLock}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <Input
                    placeholder="New Password"
                    type="password"
                    icon={FiLock}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />

                <Button
                    title="Save"
                    onClick={handleUpdate}
                />
            </Form>
        </Container>
    );
}