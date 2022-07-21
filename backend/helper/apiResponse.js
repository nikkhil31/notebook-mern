export const successResponse = (res, msg, data) => {
    let resData = {
        status: 1,
        message: msg
    };
    return res.status(200).json(resData);
}


export const successResponseWithData = (res, msg, data) => {
    let resData = {
        status: 1,
        message: msg,
        data: data
    };
    return res.status(200).json(resData);
}


export const ErrorResponse = (res, msg) => {
    let resData = {
        status: 0,
        message: msg,
    };
    return res.status(500).json(resData);
}


export const notFoundResponse = (res, msg) => {
    let resData = {
        status: 0,
        message: msg,
    };
    return res.status(404).json(resData);
}


export const validationErrorWithData = (res, msg, data) => {
    let resData = {
        status: 0,
        message: msg,
        data: data
    };
    return res.status(400).json(resData);
}


export const unauthorizedResponse = (res, msg) => {
    let resData = {
        status: 0,
        message: msg,
    };
    return res.status(401).json(resData);
}