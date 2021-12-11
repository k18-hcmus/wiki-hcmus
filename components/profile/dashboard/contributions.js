import React, { forwardRef, useEffect, useState, useImperativeHandle } from 'react';
import {contributionListToChartData} from '../../../utils/contribution-utils';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { 
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  useTheme,
  Select 
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


const Contributions = forwardRef((props, ref) => {
  const cPChartDisplay = [
      { 
        context: 'Last 7 Days',
        dateValue: new Date(new Date().setDate(new Date().getDate()-7))
      },
      { 
        context: 'Last 14 Days',
        dateValue: new Date(new Date().setDate(new Date().getDate()-14))
      },
      { 
        context: 'Last 30 Days',
        dateValue: new Date(new Date().setDate(new Date().getDate()-30))
      },
      { 
        context: 'All Time',
        dateValue: null
      },
  ];
  const [chartDisplay, setChartDisplay] = useState(cPChartDisplay[0]);
  const {cPRawData} = props;
  const [cPChartData, setCPChartData] = useState(contributionListToChartData(cPRawData, chartDisplay.dateValue));
  useImperativeHandle(ref, () => ({
    updateChartData: () => {
      setCPChartData(contributionListToChartData(cPRawData, chartDisplay.dateValue));
    }
  }));
  const handleChartDisplayChange = (event) => {
    const selectedChartDisplay = cPChartDisplay.find(item => item.context === event.target.value);
    setChartDisplay(selectedChartDisplay);
  }
  useEffect(() => {
    setCPChartData(contributionListToChartData(cPRawData, chartDisplay.dateValue));
  }, [chartDisplay]);
  const theme = useTheme();
  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: cPChartData.data,
        label: "Contribution Point Each Day",
        maxBarThickness: 10
      }
    ],
    labels: cPChartData.labels
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        fullWidth
        action={(
          <FormControl fullWidth>
            <InputLabel id="chart-display-select-label">Filter</InputLabel>
              <Select
                labelId="chart-display-select-label"
                id="chart-display-select"
                value={chartDisplay.context}
                defaultValue = ""
                label="Filter"
                onChange={handleChartDisplayChange}
                autoWidth
              >
              {cPChartDisplay.map((value, i) => {
                return (
                  <MenuItem key={i} value={value.context} primaryText={value.context}>
                    {value.context}
                  </MenuItem>
                )}
              )}
              </Select>
          </FormControl>
        )}
        title="Contribution Chart"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
});

export default Contributions;