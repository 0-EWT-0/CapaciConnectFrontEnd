<template>
    <Header />
    <div class="max-w-4xl mx-auto p-25 m-25 bg-white shadow-2xl rounded-2xl">
        <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">Enviar Reporte</h2>
        
        <form>
            <!-- Título del Reporte -->
            <div class="mb-6">
                <label class="block text-gray-700 text-xl font-semibold">Título del Reporte</label>
                <input 
                    type="text" 
                    class="w-full mt-2 p-4 text-xl border rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500" 
                    placeholder="Escribe el título del reporte..."
                    required
                />
            </div>

            <!-- Descripción del Problema -->
            <div class="mb-6">
                <label class="block text-gray-700 text-xl font-semibold">Descripción del Problema</label>
                <textarea 
                    rows="6" 
                    class="w-full mt-2 p-4 text-xl border rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500" 
                    placeholder="Describe el problema..."
                    required
                ></textarea>
            </div>

            <!-- Título del Taller -->
            <div class="mb-6">
                <label class="block text-gray-700 text-xl font-semibold">Título del Taller</label>
                <input 
                    type="text" 
                    class="w-full mt-2 p-4 text-xl border rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500" 
                    placeholder="Indica el título del taller..."
                    required
                />
            </div>

            <!-- Botón Enviar -->
            <div class="flex justify-center mt-8">
                <button 
                    type="submit"
                    class="px-8 py-4 text-lg bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition"
                >
                    📩 Enviar Reporte
                </button>
            </div>
        </form>
    </div>
    <Footer />
</template>

<script setup>
import Header from '@/components/global/Header.vue';
import Footer from '@/components/global/Footer.vue';

</script>