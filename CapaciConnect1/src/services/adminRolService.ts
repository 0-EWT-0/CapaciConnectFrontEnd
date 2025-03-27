export interface Rol {
    id: number;
    nombre: string;
    descripcion: string;
}

const initialRoles: Rol[] = [
    {
        id: 1,
        nombre: 'Administrator',
        descripcion: 'Control Total',
    },
    {
        id: 2,
        nombre: 'Cordinator',
        descripcion: 'Gestión de Talleres, Vinculación de contenido Multimedia, Gestión de Calendario, Validación y respuesta a Reportes',
    },
    {
        id: 3,
        nombre: 'Instructor',
        descripcion: 'Edición de talleres, Actualización del Progreso de participantes, Subida de contenido multimedia, Gestión de comentarios de talleres',
    },
    {
        id: 4,
        nombre: 'Participantes',
        descripcion: 'Subscripción y talleres, Seguimiento de su Progreso, Envío de comentarios y valoración, Generación de Reporte',
    },
    {
        id: 5,
        nombre: 'Colaboradores',
        descripcion: 'Acceso Restringido según permisos, Apoyo en la gestión de talleres y multimedia',
    },
];

export class RoleService {
    private roles: Rol[] = JSON.parse(JSON.stringify(initialRoles)); // Clon inicial

    async getAllRoles(): Promise<Rol[]> {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.roles), 500); // Simula delay de API
        });
    }

    async createRole(rol: Omit<Rol, 'id'>): Promise<Rol> {
        return new Promise((resolve) => {
            const newId = Math.max(...this.roles.map(r => r.id)) + 1;
            const newRol = { ...rol, id: newId };
            this.roles.push(newRol);
            setTimeout(() => resolve(newRol), 500);
        });
    }

    async deleteRole(id: number): Promise<void> {
        return new Promise((resolve) => {
            this.roles = this.roles.filter(rol => rol.id !== id);
            setTimeout(() => resolve(), 500);
        });
    }
    async updateRole(updatedRol: Rol): Promise<Rol> {
        return new Promise((resolve, reject) => {
            const index = this.roles.findIndex(r => r.id === updatedRol.id);
            if (index === -1) {
                reject(new Error('Rol no encontrado'));
                return;
            }
            this.roles[index] = { ...updatedRol };
            setTimeout(() => resolve(this.roles[index]), 500);
        });
    }
    
    async deleteAllRoles(): Promise<void> {
        return new Promise((resolve) => {
            this.roles = [];
            setTimeout(() => resolve(), 500);
        });
    }

    async resetToInitial(): Promise<void> {
        return new Promise((resolve) => {
            this.roles = JSON.parse(JSON.stringify(initialRoles));
            setTimeout(() => resolve(), 500);
        });
    }
}

export const roleService = new RoleService();
