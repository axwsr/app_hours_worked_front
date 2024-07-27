<script setup>
import { ref, onMounted } from 'vue';
import { getCompanies } from '../../service/CompanyService';

const calendarValue = ref(null);
const startTime = ref(null)
const endTime = ref(null)

const listboxValue = ref(null);
const companies = ref(null)
const company = ref(null)


const multiselectValue = ref(null);
const toggleValue = ref(false);
const selectButtonValue1 = ref(null);
const selectButtonValues1 = ref([{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }]);
const selectButtonValue2 = ref(null);
const selectButtonValues2 = ref([{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }]);
const knobValue = ref(50);
const inputGroupValue = ref(false);
const treeSelectNodes = ref(null);
const selectedNode = ref(null);

onMounted(async () => {
    companies.value = await getCompanies()
})


</script>
<template>
    <div class="grid p-fluid">
        <div class="col-12">
            <div class="card">
                <h5>Escoga la fecha</h5>
                <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarValue" />
    

                <h5>Horas de trabajo</h5>
                <div class="grid formgrid">
                    <div class="col-12 mb-4 lg:col-6 lg:mb-0 ">
                        <IconField iconPosition="right">
                            <Calendar v-model="startTime" hourFormat="12" showTime="true" timeOnly="true" :showSeconds="false" :showOnFocus="true" />
                            <InputIcon class="pi pi-calendar-times" />
                        </IconField>
                    </div>
                    <div class="col-12 mb-2 lg:col-6 lg:mb-0 ">
                        <IconField iconPosition="right">
                            <Calendar v-model="endTime" hourFormat="12" showTime="true" timeOnly="true" :showSeconds="false" :showOnFocus="true" />
                            <InputIcon class="pi pi-calendar-times" />
                        </IconField>
                    </div>
                </div>

                <h5>Float Label</h5>
                <FloatLabel>
                    <InputText id="username" type="text" v-model="floatValue" />
                    <label for="username">Username</label>
                </FloatLabel>

                <h5>Dropdown</h5>
                <Dropdown v-model="company" :options="companies" optionLabel="name" placeholder="Select" />

                
            </div>
        </div>

    </div>
</template>
