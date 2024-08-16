<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { getPersonInfo,updatePersonInfo } from '../../service/PersonService';

const toast = useToast()
const loading = ref(false)
let personInfo = ref(null)

let name = ref('')
let lastName = ref('')
let address = ref('')
let identity = ref('')
let phone = ref('')

const loadInfo = () =>{
    name.value = personInfo.value.first_name
    lastName.value = personInfo.value.last_name
    address.value = personInfo.value.address_person
    identity.value = personInfo.value.identity_document
    phone.value = personInfo.value.cell_phone
}

const saveData = async () => {
    let data = {
        "id_user": "08afeeaa-78ea-43e5-9f3a-0dcad6",
        "first_name": name.value,
        "last_name": lastName.value,
        "identity_document": identity.value,
        "address_person": address.value,
        "cell_phone": phone.value
    }

    let response = await updatePersonInfo(data)
    if (response.status == 200) {
        toast.add({ severity: 'success', summary: 'Successful', detail: `Información actualizada con éxito`, life: 3000 });
        personInfo.value = await getPersonInfo()
    }else{
        toast.add({ severity: 'warning', summary: 'Successful', detail: `Error al actualizar`, life: 3000 });
    }
    
};

onMounted(async () => {
    personInfo.value = await getPersonInfo()
})

const isFormValid = computed(() => {
    return name.value && lastName.value && identity.value && phone.value && address.value
});

watch(personInfo,loadInfo)

</script>
<template>
    <div class="grid p-fluid">
        <div class="col-12">
            <div class="card">
                <h5>Información Personal</h5>
                <div class="grid formgrid">
                    <div class="col-12 mb-4 lg:col-6 lg:mb-0 ">
                        <IconField iconPosition="right">
                            <InputText type="text" v-model="name" placeholder="Nombre" />
                        </IconField>
                    </div>
                    <div class="col-12 mb-2 lg:col-6 lg:mb-0 ">
                        <IconField iconPosition="right">
                            <InputText type="text" v-model="lastName" placeholder="Apellido" />
                        </IconField>
                    </div>
                </div>
                
                <Divider />
                
                <div class="grid formgrid">
                    <div class="col-12 mb-4 lg:col-6 lg:mb-0 ">
                        <IconField iconPosition="right">
                            <InputText type="text" v-model="identity" placeholder="Cédula" />
                            <InputIcon class="pi pi-id-card" />
                        </IconField>
                    </div>
                    <div class="col-12 mb-2 lg:col-6 lg:mb-0 ">
                        <IconField iconPosition="right">
                            <InputText type="text" v-model="phone" placeholder="Teléfono" />
                            <InputIcon class="pi pi-phone" />
                        </IconField>
                    </div>
                </div>
                
                <h5 class="mb-4">Dirección</h5>
                <FloatLabel>
                    <IconField iconPosition="right">
                        <InputText type="text" v-model="address" />
                        <InputIcon class="pi pi-envelope" />
                    </IconField>
                </FloatLabel>
                
                <Divider />

                <div class=" flex justify-content-center">
                    <Button type="button" label="Guardar" @click="saveData" icon="pi pi-save" :loading="loading" :disabled="!isFormValid"/>
                </div>
            </div>
        </div>
    </div>
</template>
