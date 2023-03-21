import moment from 'moment';

export default function formatMessage(userName, msg) {

    return {
        userName,
        msg,
        time: moment().format('h:mm a')
    }

}

