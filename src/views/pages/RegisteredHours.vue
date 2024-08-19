<script setup>
import { ref, computed } from 'vue';
import { getHourWorkedByDate } from '../../service/HourService';
import { DateTime } from 'luxon';

let startDate = ref(null)
let formattedStartDate = ""
let hoursWorkedArray = ref([])
const visibleTable = ref(false)
const visibleMsg = ref(false)
const loading = ref(false);

const searchDates = async () => {
    loading.value = true;

    let dateStart = DateTime.fromJSDate(startDate.value, { zone: 'America/Bogota' });
    formattedStartDate = dateStart.toFormat('yyyy-MM-dd');

    let data = {
        start_date: formattedStartDate
    }

    const response = await getHourWorkedByDate(data)
    if (response.length > 0) {
        hoursWorkedArray.value = response
        visibleTable.value = true
        visibleMsg.value = false
    } else {
        visibleTable.value = false
        visibleMsg.value = true
    }

    loading.value = false
}

const isFormValidSearchDates = computed(() => {
    return startDate.value;
});

const isValidHoursWorked = computed(() => {
    return hoursWorkedArray.value && hoursWorkedArray.value.length > 0;
});

const editHour = (dataHour) => {

}

const confirmDeleteHour = (dataHour) => {

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

                    <div class="field col-12 md:col-2 md:mt-4">
                        <Button label="Enviar" :disabled="!isFormValidSearchDates" :loading="loading"
                            @click="searchDates" icon="pi pi-check" />
                    </div>

                    <h4 class="col-12 text-center" v-if="visibleMsg">No hay horas registradas.</h4>
                    <div v-if="visibleTable" class="field col-12">
                        <DataTable :value="hoursWorkedArray" size="small" tableStyle="min-width: 10rem">
                            <Column header="Acciones" headerStyle="min-width:5rem;">
                                <template #body="slotProps">
                                    <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded
                                        @click="editHour(slotProps.data)" />
                                    <Button icon="pi pi-trash" class="mt-2" severity="danger" rounded
                                        @click="confirmDeleteHour(slotProps.data)" />
                                </template>
                            </Column>
                            <Column field="day_worked" header="Día"></Column>
                            <Column field="date_worked" header="Fecha"></Column>
                            <Column field="name_company" header="Empresa"></Column>
                            <Column field="start_time" header="Desde"></Column>
                            <Column field="end_time" header="Hasta"></Column>
                            <Column field="total_hours" header="Horas"></Column>
                        </DataTable>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
