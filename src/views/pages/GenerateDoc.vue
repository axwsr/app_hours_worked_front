<script setup>
import { ref } from 'vue';

const startDate = ref(null)
const endDate = ref(null)
const products = ref([
    { code: 'Small', name: 'small', category: 'sdf', quantity: '1' },
    { code: 'Normal', name: 'null', category: 'sdf', quantity: '1' },
    { code: 'Large', name: 'large', category: 'sdf', quantity: '1' }
]);

const visibleTable = ref(false)

const searchDates = () => {
    visibleTable.value = true
}

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Generar documento de horas trabajadas</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-5">
                        <label for="firstname2">Fecha Inicio</label>
                        <Calendar :showIcon="true" dateFormat="dd/mm/yy" :showButtonBar="true" v-model="startDate"
                            placeholder="Fecha inicio" />
                    </div>
                    <div class="field col-12 md:col-5">
                        <label for="lastname2">Fecha Fin</label>
                        <Calendar :showIcon="true" dateFormat="dd/mm/yy" :showButtonBar="true" v-model="endDate"
                            placeholder="Fecha fin" />
                    </div>

                    <div class="field col-12 md:col-2 md:mt-4">
                        <Button label="Enviar" @click="searchDates" icon="pi pi-check" />
                    </div>

                    <div v-if="visibleTable" class="field col-12">

                        <DataTable :value="products" size="small" tableStyle="min-width: 10rem">
                            <Column field="name" header="Name"></Column>
                            <Column field="code" header="Code"></Column>
                            <Column field="category" header="Category"></Column>
                            <Column field="quantity" header="Quantity"></Column>
                        </DataTable>
                    </div>
                    <div class="field col-12">
                        <label for="address">Address</label>
                        <Textarea id="address" rows="4" disabled />
                    </div>
                    <div class="field col-12 md:col-2 md:mt-4">
                        <Button label="Generar" icon="pi pi-save" disabled />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
