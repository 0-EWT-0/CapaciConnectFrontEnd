import { defineStore } from 'pinia'
import { roleService, type Rol } from '@/services/adminRolService'

export const useRolStore = defineStore('roles', {
  state: () => ({
    roles: [] as Rol[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async loadRoles() {
      this.isLoading = true
      try {
        this.roles = await roleService.getAllRoles()
        this.error = null
      } catch (error) {
        this.error = 'Error cargando roles'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },

    async createRole(rol: Omit<Rol, 'id'>) {
      this.isLoading = true
      try {
        const newRol = await roleService.createRole(rol)
        this.roles.push(newRol)
        this.error = null
        return newRol
      } catch (error) {
        this.error = 'Error creando rol'
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async updateRole(updatedRol: Rol) {
      this.isLoading = true
      try {
        const result = await roleService.updateRole(updatedRol)
        const index = this.roles.findIndex((r) => r.id === updatedRol.id)
        if (index !== -1) {
          this.roles[index] = result
        }
        this.error = null
        return result
      } catch (error) {
        this.error = 'Error actualizando rol'
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async deleteRole(id: number) {
      this.isLoading = true
      try {
        await roleService.deleteRole(id)
        this.roles = this.roles.filter((rol) => rol.id !== id)
        this.error = null
      } catch (error) {
        this.error = 'Error eliminando rol'
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async deleteAllRoles() {
      this.isLoading = true
      try {
        await roleService.deleteAllRoles()
        this.roles = []
        this.error = null
      } catch (error) {
        this.error = 'Error eliminando todos los roles'
        console.error(error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async resetRoles() {
      await roleService.resetToInitial()
      await this.loadRoles()
    },
  },

  getters: {
    totalRoles: (state) => state.roles.length,
  },
})
