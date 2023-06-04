import { Container, Links, Content } from './styles';
import { useState, useEffect } from 'react';
import { Button } from "../../components/Button"
import { Header } from "../../components/Header"
import { ButtonText } from "../../components/ButtonText"
import { Section } from "../../components/Section"
import { Tag } from "../../components/Tag"
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';



export function Details() {
    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState(null);

    function handleBack() {
        navigate("/")
    }

    async function handleRemove() {
        const confirm = window.confirm("Are you sure you want to delete this note?")

        if (confirm) {
            await api.delete(`/notes/${params.id}`);
            handleBack();
        }
    }

    useEffect(() => {
        async function fecthNote() {
            const response = await api.get(`/notes/${params.id}`)
            setData(response.data);
        }
        fecthNote();
    }, [])

    return (
        <Container>
            <Header />

            {
                data &&
                <main>
                    <Content>

                        <ButtonText title="Delete Note" onClick={handleRemove} />

                        <h1>
                            {data.title}
                        </h1>

                        <p>{data.description}
                        </p>

                        {
                            data.links &&
                            <Section title="Util Links">
                                <Links>
                                    {
                                        data.links.map(link => (
                                            <li key={String(link.id)}>
                                                <a href={link.url} target="_blank">
                                                    {link.url}
                                                </a>
                                            </li>
                                        ))
                                    }
                                </Links>
                            </Section>
                        }

                        {
                            data.tags &&
                            <Section title="Marcadores">

                                {
                                    data.tags.map(tag => (
                                        <Tag
                                            key={String(tag.id)}
                                            title={tag.name} />
                                        ))
                                }

                            </Section>
                        }


                        <Link to="/">
                            <Button title="Go Back" />
                        </Link>
                    </Content>
                </main>
            }
        </Container>
    )
}