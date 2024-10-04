/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'main',
        title   : 'Principal',
        type    : 'group',
        roles   : [1,2],
        children: [
            {
                id   : 'asociados',
                title: 'Asociados',
                type : 'basic',
                icon : 'heroicons_outline:users',
                link : '/asociados'
            },
            {
                id   : 'remesas',
                title: 'Remesas',
                type : 'basic',
                icon : 'heroicons_outline:document-duplicate',
                link : '/remesas'
            }
        ]
    },
    {
        id      : 'administracion',
        title   : 'Administración',
        type    : 'group',
        roles   : [1],
        children: [
            {
                id   : 'users',
                title: 'Gestión usuarios',
                type : 'basic',
                icon : 'heroicons_outline:users',
                link : '/usuarios'
            }
        ]
    },
    /*
    {
        id      : 'maestros',
        title   : 'Maestros',
        type    : 'group',
        children: [
            {
                id   : 'formas-juridicas',
                title: 'Formas juridicas',
                type : 'basic',
                icon : 'heroicons_outline:users',
                link : '/formas-juridicas'
            },
            {
                id   : 'formas-pago',
                title: 'Formas pago',
                type : 'basic',
                icon : 'heroicons_outline:users',
                link : '/formas-pago'
            },
        ]
    }*/
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
