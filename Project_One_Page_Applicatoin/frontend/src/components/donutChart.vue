<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default { //DH: This is the zip code donut chart for the home page
    props: {
        labels: {
            type: Array
        },
        data: {
            type: Array
        }
    },
    async mounted() {
        const backgroundColor = this.data.map(() => this.getColor())
        const borderColor = backgroundColor.map((e) =>
            e.replace(/[\d\.]+\)$/g, '1)')
        )

        await new Chart(this.$refs.chart3, { //DH: Create the donut chart
            type: 'doughnut',
            data: {
                labels: this.labels, //DH: Zip codes are the labels
                datasets: [
                    {
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    data: this.data, //DH: Number of clients in each zip code
                    hoverOffset: 4 //DH: Increase the hover offset
                    }
                ]
            },
        })
    },
    methods: { //DH: Get a random color for the donut chart slices
        getColor() {
            let channel = () => Math.random() * 255
            return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`
        }
    }
}
                            
</script>
<template>
    <div class="shadow-lg rounded-lg overflow-hidden">
        <canvas class="p-10" ref="chart3"></canvas> <!-- DH: Create the canvas for the donut chart -->
    </div>
</template>