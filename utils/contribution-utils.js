import { format, compareAsc  } from 'date-fns';
import axiosClient from '../axiosClient';
import { ContributionConst } from '../shared/contribution-const';

function contributionListToChartData(data, startDate) {
    const today = new Date();
    if (data === null) 
        return {
            data: null,
            labels: null
        }
    var result = {
        data: [],
        labels: []
    }
    var convertedData = data.map((record) => {
        return {value: record.Value, date: Date.parse(record.Date)}
    });
    var refinedData = convertedData.filter(data => data.date > startDate);
    // var curDate = startDate;
    // while (curDate <= today) {
    //     console.log(refinedData[0].date);
    //     console.log(Date.parse(curDate));
    //     if (refinedData.find(data => data.date.getDay() === curDate.date.getDay) === undefined)
    //         refinedData.push({
    //             value: 0,
    //             date: curDate
    //         });
    //     curDate = new Date(new Date().setDate(curDate.getDate()+1))
    // }
    refinedData.sort((a,b) => a.date > b.date ? 0 : -1);
    refinedData.forEach((data) => {
        result.labels.push(format(data.date, "dd/MM"));
        result.data.push(data.value);
    });
    return result;
}

async function addContribution(userId, value) {
    const userResult = await axiosClient.get(`/account-users?id=${userId}`);
    if (userResult.data.length > 0) {
        const userData = userResult.data[0];
        const result = await axiosClient.get(`/contributions?User.id=${userId}&Date=${format(new Date(), 'yyyy-MM-dd')}`);
        if (result.data.length > 0) {
            const totalValue = result.data[0].Value + value;
            const contributionId = result.data[0].id;
            const newContributionData = {
                ...result.data[0],
                Value: totalValue
            }
            axiosClient({
                method: 'put',
                url: `/contributions/${contributionId}`,
                data: newContributionData,
                headers: {
                }
            })
        }
        else {
            const newContributionData = {
                Date: format(new Date(), 'yyyy-MM-dd'),
                Value: value,
                User: userData
            }
            axiosClient({
                method: 'post',
                url: `/contributions`,
                data: newContributionData,
                headers: {
                }
            })
        }
    }
    else
        console.log(`AddContribution Error: User.id=${userId} not found`);
}

export {contributionListToChartData, addContribution}