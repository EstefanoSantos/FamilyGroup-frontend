import '../styles/footer.css';

export default function Footer() {
    const developerLink = "https://github.com/EstefanoSantos?tab=repositories";

    return (
        <footer>
            <h2>Desenvolvido por <a href={developerLink} 
            target="_blank">Estéfano Santos</a>
            </h2>
        </footer>
    )
} 