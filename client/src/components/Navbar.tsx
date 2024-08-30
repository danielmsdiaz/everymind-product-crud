import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import logo from '/nunes-sports-high-resolution-logo-transparent.png';

const Navbar = () => {
    const itemRenderer = (item: MenuItem) => (
        <a target="_blank" href={item.url} className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
        </a>
    );

    const itemsStart: MenuItem[] = [
        {
            label: 'Produtos',
            icon: 'pi pi-shopping-bag',
            style: {
                backgroundColor: '#f0f0f0',  // Cor de fundo
                boxShadow: '0 4px 2px -2px gray', // Sombra embaixo
                fontWeight: 'bold',
            }
        }
    ];

    const itemsEnd: MenuItem[] = [
        {
            label: 'Minhas Redes',
            icon: 'pi pi-users',
            items: [
                {
                    label: 'GitHub',
                    icon: 'pi pi-github',
                    url: 'https://github.com/danielmsdiaz',
                    template: itemRenderer
                },
                {
                    label: 'LinkedIn',
                    icon: 'pi pi-linkedin',
                    url: 'https://www.linkedin.com/in/danielmsdiaz/',
                    template: itemRenderer
                }
            ]
        }
    ];

    const start = (
        <div className="flex align-items-center">
            <img alt="logo" src={logo} height="25" className="mr-2" />
        </div>
    );

    return (
        <div className="card">
            <Menubar model={itemsStart} start={start} end={<Menubar model={itemsEnd} />} />
        </div>
    );
}

export default Navbar;
