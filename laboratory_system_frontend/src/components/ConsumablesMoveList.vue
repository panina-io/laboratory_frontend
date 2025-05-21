<template>
    <div>
    <h1 class="section-name">
        Журнал движения расходников для анализаторов
    </h1>
    <table class="components-list">
        <thead>
        <tr class="table-header">
            <th class="head">
                Тип расходника
            </th>
            <th class="head">
                Производитель
            </th>
            <th class="head">
                Серия/лот
            </th>
            <th class="head">
                Состояние
            </th>
            <th class="head">
                Расход
            </th>
            <th class="head">
                Дата изменения
            </th>
          </tr>
        </thead>
        <consumables-move-component
                v-for="item in items"
                    :item="item"/>
        </table>
</div>
</template>

<script>
import ConsumablesMoveComponent from './ConsumablesMoveComponent.vue'
    export default{
        components: {
            ConsumablesMoveComponent, 
        },
        data(){
            return {
                items: [],
            }
        },
        methods: {
            async getData(){
                try{
                    const response = await this.$http.get("analyzersconsumables_move/", {headers: {authorization: `Bearer ${localStorage.access_token}`}})
                    this.items = response.data
                }
                catch(error){
                    console.log(error)
                }
            },
            refresh() {
                setTimeout(() => { this.getData(); },500);
            },
        },
        created(){
            this.getData()
        }
    }
</script>


