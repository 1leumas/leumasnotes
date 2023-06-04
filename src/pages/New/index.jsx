import { Container, Form } from './styles'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from "../../components/Textarea";
import { NoteItem } from '../../components/NoteItem'
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export function New() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const navigate = useNavigate();

    function handleAddLink() {
        if (newLink) {
            setLinks(prevLinks => [...prevLinks, newLink]);
            setNewLink("");
        }
    }

    function handleRemoveLink(index) {
        setLinks(prevLinks => prevLinks.filter((_, i) => i !== index));
    }

    function handleAddTag() {
        if (newTag) {
            setTags(prevTags => [...prevTags, newTag]);
            setNewTag("");
        }
    }

    function handleRemoveTag(index) {
        setTags(prevTags => prevTags.filter((_, i) => i !== index));
    }

    async function handleNewNote() {

        if (!title || !description || tags.length === 0 || links.length === 0) {    //check if all fields are filled
            return alert("Please fill all the fields.");
        }

        await api.post("/notes", {
            title,
            description,
            tags,
            links
        });

        alert("Note created!");
        navigate("/");
    }

    return (
        <Container>
            <Header />
            <main>
                <Form>
                    <header>
                        <h1>Create Note</h1>
                        <Link to="/">Return</Link>
                    </header>
                    <Input
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Textarea
                        placeholder="Description"
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Section title="Useful Links">
                        {links.map((link, index) => (
                            <NoteItem
                                key={String(index)}
                                value={link}
                                onClick={() => handleRemoveLink(index)}
                            />
                        ))}
                        <NoteItem
                            isNew
                            placeholder="New Link"
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={handleAddLink}
                        />
                    </Section>
                    <Section title="Tags">
                        <div className='tags'>
                        {tags.map((tag, index) => (
                            <NoteItem
                                key={String(index)}
                                value={tag}
                                onClick={() => handleRemoveTag(index)}
                            />
                        ))}
                        <NoteItem
                            isNew
                            placeholder="New Tag"
                            value={newTag}
                            onChange={e => setNewTag(e.target.value)}
                            onClick={handleAddTag}
                        />
                        </div>
                    </Section>
                    <Button title="Save" onClick={handleNewNote} />
                </Form>
            </main>
        </Container>
    );
}