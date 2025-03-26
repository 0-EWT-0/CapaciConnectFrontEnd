import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { WorkshopType, WorkshopTypeDTO } from '@/interfaces/workshopTypesInterface';
import { workshopTypeService } from '@/services/WorkshopTypeService';
import router from '@/router';

export const useWorkshopTypeStore = defineStore('workshopType', () => {
  const types = ref<WorkshopType[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Obtener todos los tipos de taller
  const fetchAllTypes = async (): Promise<void> => {
    try {
      isLoading.value = true;
      error.value = null;
      types.value = await workshopTypeService.getAllTypes();
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Error al cargar tipos de taller';

      if (err instanceof Error && err.message.includes('401')) {
        router.push('/login');
      }
    } finally {
      isLoading.value = false;
    }
  };

  // Crear nuevo tipo de taller
  const createType = async (typeData: WorkshopTypeDTO): Promise<WorkshopType> => {
    try {
      isLoading.value = true;
      error.value = null;

      // Validación básica del DTO
      if (!typeData.type_name || typeData.type_name.trim() === '') {
        throw new Error('El nombre del tipo es requerido');
      }

      const newType = await workshopTypeService.createType(typeData);
      await fetchAllTypes(); // Actualizar la lista
      return newType;
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Error al crear tipo de taller';

      if (err instanceof Error && err.message.includes('401')) {
        router.push('/login');
      }

      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Eliminar tipo de taller
  const deleteType = async (id: number): Promise<void> => {
    try {
      isLoading.value = true;
      error.value = null;

      await workshopTypeService.deleteType(id);
      await fetchAllTypes(); // Actualizar la lista
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Error al eliminar tipo de taller';

      if (err instanceof Error && err.message.includes('401')) {
        router.push('/login');
      }

      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    types,
    isLoading,
    error,
    fetchAllTypes,
    createType,
    deleteType,
  };
});
