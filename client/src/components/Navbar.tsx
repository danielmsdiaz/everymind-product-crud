import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { MenuItem } from 'primereact/api';
import logo from '/nunes-sports-high-resolution-logo-transparent.png';

const Navbar = () => {
    const itemRenderer = (item: MenuItem) => (
        <a target="_blank" href={item.url} className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const items: MenuItem[] = [
        {
            label: 'Produtos',
            icon: 'pi pi-shopping-bag',
            style: {
                backgroundColor: '#f0f0f0',  // Cor de fundo
                boxShadow: '0 4px 2px -2px gray', // Sombra embaixo
                fontWeight: 'bold',
            }
        },
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
            <Menubar model={items} start={start}/>
        </div>
    )
}

export default Navbar;
