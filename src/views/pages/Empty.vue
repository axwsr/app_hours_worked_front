<script setup>
import { ref, onUnmounted, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { getCompanies } from '../../service/CompanyService';
const toast = useToast();
const isWorking = ref(false);
const timer = ref(0);
const interval = ref(null);
// const timeFactor = 300; // Ajusta este valor para acelerar el tiempo (10x aquí)
const visibleDialog = ref(false);
const showEditInput = ref(false);
const roundedHours = ref(0);
const companies = ref(null)



const startTimer = () => {
    isWorking.value = true;
    interval.value = setInterval(() => {
        timer.value += 1;
        // timer.value += timeFactor; // Incrementa el cronómetro por el factor de tiempo
    }, 1000);
};

const stopTimer = () => {
    isWorking.value = false;
    clearInterval(interval.value);
    interval.value = null;
};

const toggleTimer = () => {
    if (isWorking.value) {
        stopTimer();
        calculateRoundedHours();
        visibleDialog.value = true;
    } else {
        startTimer();
    }
};

const calculateRoundedHours = () => {
    const hrs = Math.floor(timer.value / 3600);
    const mins = Math.floor((timer.value % 3600) / 60);

    if (mins > 20 && mins <= 44) {
        roundedHours.value = hrs + 0.5;
    } else if (mins > 44 && mins <= 60) {
        roundedHours.value = hrs + 1;
    } else {
        roundedHours.value = hrs;
    }
};

const dropdownItems = ref([
    { name: 'Wingz Campestre', code: '1' },
    { name: 'Frisby', code: '2' },
    { name: 'Madcdonal', code: '3' }
]);
const dropdownItem = ref(null);

const registerHours = () => {
    console.log(`Horas trabajadas registradas: ${roundedHours.value}`);
    timer.value = 0;
    visibleDialog.value = false;
    toast.add({ severity: 'success', summary: 'Successful', detail: ` ${roundedHours.value} Horas registradas con éxito  `, life: 3000 });
};

const continueWorking = () => {
    visibleDialog.value = false;
    startTimer();
};

const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

onMounted(async () => {
    companies.value = await getCompanies()
    console.log(companies.value);
})

onUnmounted(() => {
    stopTimer();
});


</script>

<template>


    <div class="flex justify-content-center align-items-center min-h-screen">

        <div class="col-12 lg:col-5">
            <div>
                <div class="field col-12 md:col-3">
                    <FloatLabel>
                        <Dropdown id="company" v-model="dropdownItem" :options="dropdownItems" optionLabel="name"
                            placeholder="Select One"></Dropdown>
                        <label for="company">Empresa</label>
                    </FloatLabel>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-5">
            <div class="p-3 h-full">
                <div class="shadow-2 p-3 flex flex-column surface-card" style="border-radius: 6px">
                    <div class="text-900 font-medium text-xl mb-2 text-center">Registro de horas</div>
                    <hr class="my-3 mx-0 border-none surface-border" />
                    <div class="flex align-items-center justify-content-center">
                        <span class="font-bold text-2xl text-900">{{ formatTime(timer) }}</span>
                    </div>
                    <hr class="mb-3 mx-0 border-none surface-border" />
                    <Button @click="toggleTimer" :severity="isWorking ? 'contrast' : 'success'"
                        :label="isWorking ? 'Dejar de trabajar' : 'Entrar a trabajar'"
                        class="p-3 w-full p-button-outlined"></Button>
                </div>
            </div>
        </div>
    </div>

    <Dialog v-model:visible="visibleDialog" modal header="Confirmacion de horas" :style="{ width: '25rem' }">
        <div class="text-900 font-medium text-xl mb-2 text-center">Horas: {{ roundedHours }} </div>
        <div class="mb-3">
            <Button label="Editar" @click="showEditInput = !showEditInput" link />
        </div>
        <div class="flex justify-content-center text-center mb-5 mt-3" v-if="showEditInput">
            <InputNumber v-model="roundedHours" inputId="horizontal-buttons" showButtons buttonLayout="horizontal"
                :step="0.50" mode="decimal" :min="0" :max="24" fluid>
                <template #incrementbuttonicon>
                    <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus" />
                </template>
            </InputNumber>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancelar" severity="secondary" @click="continueWorking"></Button>
            <Button type="button" label="Confirmar" @click="registerHours"></Button>
        </div>
    </Dialog>
</template>
