<template>
    <tr>
        <td>{{ item.box_data.cons_type_name }}</td><td>{{ item.box_data.manufacturer_name }}</td><td>{{ item.box_data.lot }}</td>
        <td>{{ item.move_name }}</td><td>{{ item.expenditure }}</td><td>{{ formatDate(item.add_time) }}</td>
    </tr>
</template>

<script>
    import dayjs from 'dayjs'
    export default{
        props: {
            item: {
                type: Object,
            },
        },
        methods: {
            formatDate(dateStr) {
                return dayjs(dateStr).format('DD.MM.YYYY HH:mm')
                }
            }
        }
</script>


<style>
  td {
	padding: 10px;
	font-size: 14px;
	line-height: 10px;
	color: #444441;
	border-top: 1px solid #716561;
}
    .components:hover {
    background: #bcbcbc6e;
    cursor: pointer;
}

</style>