<template>
    <div>
    <h1 class="section-name">
        Журнал движения реактивов
    </h1>
    <table class="components-list">
        <tr>
            <th class="head">
                Показатель
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
        <reagent-move-component
                v-for="item in items"
                    :item="item"/>
        </table>
</div>
</template>

<script>
import ReagentMoveComponent from './ReagentMoveComponent.vue'
    export default{
        components: {
            ReagentMoveComponent, 
        },
        data(){
            return {
                items: [],
            }
        },
        methods: {
            async getData(){
                try{
                    const response = await this.$http.get("reagent_move/", {headers: {authorization: `Bearer ${localStorage.access_token}`}})
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


