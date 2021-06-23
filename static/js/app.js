//////STEP 1: Use D3 library to read in samples.json and dynamically call updates when a new ID is selected. //////
data = d3.json("data/samples.json").then((data) => {
     console.log(data);

     var sampleNames = data.names;
     console.log(sampleNames);
     
     sampleNames.forEach((sample) => {
     d3.select("#selDataset").append("option").text(sample).property("value", sample);
     });

 
 //////STEP 2: Initiallize page with default plots. //////

     function init() {

          //BAR CHART//

          //filter data for test ID No.940 as default plot
          defaultDataset = data.samples.filter(sample => sample.id === "940")[0];
          console.log(defaultDataset);
          //sellect top 10 OTU's for the ID with sample_values, otu_ids, and otu_labels
          default_sampleValues = defaultDataset.sample_values.slice(0,10);
          default_otu_ids = defaultDataset.otu_ids.slice(0,10);
          default_otu_labels = defaultDataset.otu_labels.slice(0,10);
          console.log(default_otu_ids);
          console.log(default_sampleValues)

          //plot horizontal bar chart
          trace1 = [{
               type: 'bar',
               x: default_sampleValues,
               y: default_otu_ids,
               text: default_otu_labels,
               orientation: 'h'
          }];

          var barData = [trace1];
          
          var barLayout = {
               title: `Top 10 Bacteria Cultures Found`,
               xaxis: {title: "Sample Value"},
               width: 450,
               height: 600,
          }

          Plotly.newPlot('bar', barData, barLayout);

          //call update when a change takes place to the DOM
          d3.select("#selDataset").on("change", updatePlotly);

          //create updatePlotly to initiate when a new ID is selected
          function updatePlotly() {

               //use d# to select dropdown menu
               var dropdownMenu = d3.select("#selDataset").node();
               // Assign the value of the dropdown menu option to a variable
               var inputValue = dropdownMenu.value;
               console.log(inputValue);

               //filter dataset based on inputValue
               dataset = data.samples.filter(sample => sample.id === inputValue) [0];
               console.log(dataset);

               //select all sample_values, otu_ids, otu_labels, of each selected test ID
               allSampleValues = dataset.sample_values;
               allOtuIds = dataset.otu_ids;
               allOtuLabels = dataset.otu_labels;

               //slice to the top 10 values of each
               top10Values = allSampleValues.slice(0,10);
               top10Ids = allOtuIds.slice(0,10);
               top10Labels = allOtuLabels.slice(0,10);

               //restyle chart–––
               Plotly.restyle("bar", "x", [top10Values]);
               Plotly.restyle("bar", "y", [top10Ids]);
               Plotly.restyle["bar", "text", [top10Labels]];
               
          }
     };

init();
})

 




//////STEP 4: Plot bar chart //////



//////STEP 5: Plot bubble chart //////



//////STEP : Plot Demogrpahic info table //////




// var names = data.names.map(d => )

// //Use sample_values as the values for the bar chart.
// var sample_values = Object.values(data.samples.sample_values[0]);

// //Use otu_ids as the labels for the bar chart
// var labels = Object.keys(data.samples.otu_ids[0]);

// console.log(labels);









// var id = data.metadata.id;
// var ethnicity = data.metadata.ethnicity;
// var gender = data.metadata.gender;
// var age = data.metadata.age;
// var location = data.metadata.location;
// var bbtype = data.metadata.bbtype;
// var wfreq = data.metadata.