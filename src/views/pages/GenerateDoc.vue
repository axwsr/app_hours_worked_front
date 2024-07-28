<script setup>
import { ref, computed } from 'vue';
import { getHourWorkedByDate } from '../../service/HourService';
import { generatePDF } from '../../service/DocumentService';
import { DateTime } from 'luxon';
import { NumerosALetras } from 'numero-a-letras';

let startDate = ref(null)
let endDate = ref(null)
let formattedStartDate = ref(null)
let formattedEndDate = ref(null)
let hoursWorkedArray = ref(null)
let observation = ref(null)
const visibleTable = ref(false)

const searchDates = async () => {
    visibleTable.value = true
    let dateEnd = DateTime.fromJSDate(endDate.value, { zone: 'America/Bogota' });
    formattedEndDate = dateEnd.toFormat('yyyy-MM-dd');

    let dateStart = DateTime.fromJSDate(startDate.value, { zone: 'America/Bogota' });
    formattedStartDate = dateStart.toFormat('yyyy-MM-dd');

    let data = {
        start_date: formattedStartDate,
        end_date: formattedEndDate
    }
    hoursWorkedArray.value = await getHourWorkedByDate(data)
}

const generateDoc = () => {
    const totalHours = computed(() => {
        return hoursWorkedArray.value.reduce((acc, current) => {
            return acc + +current.total_hours;
        }, 0);
    });

    console.log(totalHours.value);
    let pay_number_temp = totalHours.value * 11000
    let pay_number = new Intl.NumberFormat('es-CO', { minimumFractionDigits: 0 }).format(pay_number_temp)
    console.log(pay_number);

    let pay_word_temp = NumerosALetras(pay_number_temp, {
        plural: 'pesos',
        singular: 'peso',
        centPlural: 'centavos',
        centSingular: 'centavo'
    });

    let pay_word = pay_word_temp.replace(/00\/100 M\.N\./, '').trim();
    console.log(pay_word);

}

const isFormValidSearchDates = computed(() => {
    return startDate.value && endDate.value;
});

const isValidHoursWorked = computed(() => {
    return hoursWorkedArray.value && hoursWorkedArray.value.length > 0;
});

const isValidObservation = computed(() => {
    return observation.value;
});

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
                        <Button label="Enviar" :disabled="!isFormValidSearchDates" @click="searchDates"
                            icon="pi pi-check" />
                    </div>

                    <div v-if="visibleTable" class="field col-12">

                        <DataTable :value="hoursWorkedArray" size="small" tableStyle="min-width: 10rem">
                            <Column field="date_worked" header="Fecha"></Column>
                            <Column field="name_company" header="Empresa"></Column>
                            <Column field="start_time" header="Desde"></Column>
                            <Column field="end_time" header="Hasta"></Column>
                            <Column field="total_hours" header="Horas"></Column>
                        </DataTable>
                    </div>
                    <div class="field col-12">
                        <label for="address">Address</label>
                        <Textarea id="address" rows="4" v-model="observation" :disabled="!isValidHoursWorked" />
                    </div>
                    <div class="field col-12 md:col-2 md:mt-4">
                        <Button label="Generar" icon="pi pi-save" @click="generateDoc"
                            :disabled="!isValidObservation" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
