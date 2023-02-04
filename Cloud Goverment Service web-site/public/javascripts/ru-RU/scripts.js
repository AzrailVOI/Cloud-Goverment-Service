window.onload = () => {
    //DOM
    const userfoto = document.querySelector('.secuser-userfoto-img');
    const navbar = document.querySelector(".nav-bg")
    const [...sec] = document.getElementsByTagName("section")
    //Functions
    function Hwidth(objekt) {
        try{
            let styleobj = getComputedStyle(objekt)
            objekt.style.height = styleobj.width
        } catch (error){
            console.log(`Objekt not found\n`, error)
        }
    }
    //Code
    Hwidth(userfoto)
    try{
        let snavbar = getComputedStyle(navbar)
        console.log(sec[0])
        sec[0].style.paddingTop = Number(snavbar.height.replace('px', '')) + 10 + "px"
    } catch(error){
        console.log(error)
    }
    window.addEventListener('scroll', () => {
        if (pageYOffset > 0) {
            navbar.style.borderColor = "#000"
        } else{
            navbar.style.borderColor = "#fff"
        }
    });

    try {
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ['Рес', 'Время (деньги)'],
                ['Канцелярия', .15],
                ['Работяги', .20],
                ['Время', .65]
            ]);

            var options = {'width': 600, 'height': 500};

            var chart = new google.visualization.PieChart(document.getElementById('diag'));
            chart.draw(data, options);
        }
    } catch (error){
        console.log(error)
    }
    let date = new Date()
    copydate.innerHTML = date.getFullYear()



}