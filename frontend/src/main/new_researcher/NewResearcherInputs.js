import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, TextField, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import * as XLSX from 'xlsx';
import Var from '../Var.js';
import AuthInfo from "../auth/AuthInfo.js";

const NewResearcherInputs = forwardRef((props, ref) => {
    const context = props.context;

    const [disable, setDisable] = useState(false);
    const [nameKo, setNameKo] = useState("");
    const [nameUs, setNameUs] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [phone, setPhone] = useState("");
    const [institution, setInstitution] = useState("");
    const [major, setMajor] = useState("");
    const [position, setPosition] = useState("");
    const [adviser, setAdviser] = useState("");
    const [applicationDate, setApplicationDate] = useState("");
    const [createDate, setCreateDate] = useState("");
    const [perpose, setPerpose] = useState("");
    const [applicationRoute, setApplicationRoute] = useState("");
    const [etc, setEtc] = useState("");
    const [history, setHistory] = useState("");
    const [privateInfo, setPrivateInfo] = useState("");
    const [group, setGroup] = useState("");
    const [userId, setUserId] = useState("");
    const [trainingInstitution, setTrainingInstitution] = useState("");
    const [trainingPart, setTrainingPart] = useState("");
    const [trainingCharge, setTrainingCharge] = useState("");
    const [trainingCost, setTrainingCost] = useState("");
    const [trainingStartDate, setTrainingStartDate] = useState("");
    const [trainingExtensionDate, setTrainingExtensionDate] = useState("");
    const [trainingEndDate, setTrainingEndDate] = useState("");
    const [applicationNumber, setApplicationNumber] = useState("");
    const [type, setType] = useState("");
    const [trainingContry, setTrainingContry] = useState("");

    const fileInput = React.useRef(null);
    const cloudServiceApplicationGoogleFormUserDataKey = {
        "-(학생 또는 연구원의 경우 해당 시) 지도교수:": "adviser",
        "날짜": "application_date",
        "신청 경로": "application_route",
        "클라우드": "cloud_service",
        "생성날짜": "create_date",
        "소속기관 이메일": "email",
        "기타": "etc",
        "히스토리": "history",
        "-소속기관(국문이름):": "institution",
        "-전공": "major",
        "이름(국문)": "name_ko",
        "이름": "name_ko",
        "이름(영문)": "name_us",
        "연구 및 교육 사용목적 (자세히)": "perpose",
        "휴대폰 번호": "phone",
        "-직급(직위):": "position",
        "개인정보 수집·이용 및 제3자 제공 동의": "private_info",
        "IonQ 양자컴퓨터 클라우드를 처음 접하게 된 계기": "find_out",
        "상태": "status",
        "유저아이디": "user_id",
    }

    const cloudServiceIBMQUserDataKey = {
        "-(학생 또는 연구원의 경우 해당 시) 지도교수:": "adviser",
        "계정생성일자": "application_date",
        "신청 경로": "application_route",
        "클라우드": "cloud_service",
        "생성날짜": "create_date",
        "이메일": "email",
        "비고": "etc",
        "히스토리": "history",
        "기관": "institution",
        "소속": "major",
        "구분": "group",
        "이름(국문)": "name_ko",
        "이름": "name_ko",
        "이름(영문)": "name_us",
        "휴대전화": "phone",
        "학년/직위:": "position",
        "개인정보 수집·이용 및 제3자 제공 동의": "private_info",
        "IonQ 양자컴퓨터 클라우드를 처음 접하게 된 계기": "find_out",
        "상태": "status",
        "학번(교번)": "user_id",
    }

    useImperativeHandle(ref, () => ({
        getNewResearcherData(e) {
            const data = {};
            data.name_ko = nameKo;
            data.name_us = nameUs;
            data.email = email;
            data.status = status;
            data.phone = phone;
            data.institution = institution;
            data.major = major;
            data.position = position;
            data.adviser = adviser;
            data.application_date = applicationDate;//this will be ISO format - new Date() -> toISOString()
            data.create_date = createDate;//this will be ISO format - new Date() -> toISOString()
            data.perpose = perpose;
            data.application_route = applicationRoute;
            data.etc = etc;
            data.history = history;
            data.private_info = privateInfo;
            data.group = group;
            data.user_id = userId;
            data.training_institution = trainingInstitution;
            data.training_part = trainingPart;
            data.training_charge = trainingCharge;
            data.application_number = applicationNumber;
            data.training_start_date = trainingStartDate;
            data.training_extension_date = trainingExtensionDate;
            data.training_end_date = trainingEndDate;
            data.training_cost = trainingCost;
            data.training_contry = trainingContry;
            data.type = type;
            // console.log("data",data);
            return data;
        }
    }))

    const resultData = (data) => {
        console.log("complete upload data", data);
    };

    const uploadData = (data) => {
        axios
            .put(Var.getServiceUrl() + "/newresearcher", { "newResearcherList": data }, AuthInfo.getAxiosConfig())
            .then(({ data }) => {
                resultData(data);
                setDisable(false);
                if (data[0]._id != undefined && data[0]._id.length >20) {
                    alert("Save Success!");
                    Var.refreshPage();
                }
            });
    };

    const refreshPage = (e) => {
        window.location.reload(false);
    }

    const handleOnSubmit = () => {
        setDisable(true);
        fileInput.current.click();
    }

    const handleStatusSelectChange = (e) => {
        setStatus(e.target.value);
    }

    const handleSaveNewResearcher = (e) => {
        setDisable(true);
        // console.log("e", e);
        const data = [{}];
        data[0].name_ko = nameKo;
        data[0].name_us = nameUs;
        data[0].email = email;
        data[0].status = status;
        data[0].phone = phone;
        data[0].institution = institution;
        data[0].major = major;
        data[0].position = position;
        data[0].adviser = adviser;
        data[0].application_date = applicationDate;//this will be ISO format - new Date() -> toISOString()
        data[0].create_date = createDate;//this will be ISO format - new Date() -> toISOString()
        data[0].perpose = perpose;
        data[0].application_route = applicationRoute;
        data[0].etc = etc;
        data[0].history = history;
        data[0].private_info = privateInfo;
        data[0].group = group;
        data[0].user_id = userId;
        data[0].training_institution = trainingInstitution;
        data[0].training_part = trainingPart;
        data[0].training_charge = trainingCharge;
        data[0].application_number = applicationNumber;
        data[0].training_start_date = trainingStartDate;
        data[0].training_extension_date = trainingExtensionDate;
        data[0].training_end_date = trainingEndDate;
        data[0].training_cost = trainingCost;
        data[0].training_contry = trainingContry;
        data[0].type = type;
        // console.log("data",data);
        uploadData(data);
    }

    const handleInputChange = (e) => {
        // console.log(e.target);
        // console.log(e.target.files[0]);
        // console.log(e.target.files[0].data);
        const fileReader = new FileReader();
        const file = e.target.files[0];

        const jsonToObjectArray = (rowObj) => {
            const data = rowObj.map(r => {

                    const obj = Object.keys(cloudServiceIBMQUserDataKey).reduce((object, header, index) => {
                        if (r[header] != undefined) {
                            object[cloudServiceIBMQUserDataKey[header]] = r[header];
                        }
                        return object;
                    }, {});
                    return obj;
            });

            uploadData(data);
        };

        fileReader.onload = function (event) {
            var wb = XLSX.read(fileReader.result, { type: 'binary', cellDates: true, dateNF: 'YYYY-MM-DD' });
            var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            jsonToObjectArray(rowObj);
        };

        fileReader.readAsBinaryString(file);

    };

    return (
        <div style={{ width: '100%', height: 600, margin: '0 0 0 0' }}>
            {context != Var.Context().TicketInputs() &&
                <div>
                    <Stack spacing={2} direction="row" justifyContent="end" sx={{ m: 1 }} >
                        <Button variant="outlined" onClick={handleSaveNewResearcher} disabled={disable}>Save New Researcher</Button>
                        <Button variant="outlined" onClick={refreshPage}>Reset</Button>
                    </Stack>
                </div>
            }
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            id="status-select"
                            value={status}
                            label="Status"
                            onChange={handleStatusSelectChange}
                        >
                            <MenuItem value={"APPLICATION"}>APPLICATION</MenuItem>
                            <MenuItem value={"FAIL"}>FAIL</MenuItem>
                            <MenuItem value={"CANCEL"}>CANCEL</MenuItem>
                            <MenuItem value={"READY"}>READY</MenuItem>
                            <MenuItem value={"TRAINING"}>TRAINING</MenuItem>
                            <MenuItem value={"FINISH"}>FINISH</MenuItem>
                            <MenuItem value={"EXTENSION"}>EXTENSION</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <TextField
                        id="name_ko"
                        label="Name(KR)"
                        onChange={(v) => setNameKo(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="name_us"
                        label="Name(EN)"
                        onChange={(v) => setNameUs(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="application_date"
                        label="Application Date"
                        onChange={(v) => setApplicationDate(v.target.value)}
                        defaultValue={""}
                    />
                </div>
                <div>

                    <TextField
                        id="email"
                        label="Email"
                        onChange={(v) => setEmail(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="Phone"
                        label="phone"
                        onChange={(v) => setPhone(v.target.value)}
                        defaultValue={""}
                    />
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="user-group-select-label">Group</InputLabel>
                            <Select
                                labelId="user-group-select-label"
                                id="user-group-select"
                                value={group}
                                label="Group"
                                onChange={(v) => setGroup(v.target.value)}
                            >
                                <MenuItem value={"EMPLOYEE"}>EMPLOYEE</MenuItem>
                                <MenuItem value={"GRADUATE"}>GRADUATE</MenuItem>
                                <MenuItem value={"STUDENT"}>STUDENT</MenuItem>

                            </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="type-select-label">Type</InputLabel>
                            <Select
                                labelId="type-select-label"
                                id="type-select"
                                value={type}
                                label="Type"
                                onChange={(v) => setType(v.target.value)}
                            >
                                <MenuItem value={"PROJECT"}>PROJECT</MenuItem>
                                <MenuItem value={"INTERNSHIP"}>INTERNSHIP</MenuItem>
                                <MenuItem value={"INSTCOORPERATION"}>INSTCOORPERATION</MenuItem>

                            </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        id="institution"
                        label="Institution"
                        onChange={(v) => setInstitution(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="major"
                        label="Major"
                        onChange={(v) => setMajor(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="position"
                        label="Position"
                        onChange={(v) => setPosition(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="adviser"
                        label="Adviser"
                        onChange={(v) => setAdviser(v.target.value)}
                        defaultValue={""}
                    />
                </div>
                <div>
                    <TextField
                        id="training_institution"
                        label="Training Institution"
                        onChange={(v) => setTrainingInstitution(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="training_part"
                        label="Training Department"
                        onChange={(v) => setTrainingPart(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="training_contry"
                        label="Training Contry"
                        onChange={(v) => setTrainingContry(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="training_cost"
                        label="Training Cost"
                        onChange={(v) => setTrainingCost(v.target.value)}
                        defaultValue={""}
                    />
                </div>
                <div>
                    <TextField
                        id="application_number"
                        label="Application Number"
                        onChange={(v) => setApplicationNumber(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="training_start_date"
                        label="Training Start Date"
                        onChange={(v) => setTrainingStartDate(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="training_extension_date"
                        label="Training Extension Date"
                        onChange={(v) => setTrainingExtensionDate(v.target.value)}
                        defaultValue={""}
                    />
                    <TextField
                        id="training_end_date"
                        label="Training End Date"
                        onChange={(v) => setTrainingEndDate(v.target.value)}
                        defaultValue={""}
                    />
                </div>
                <div>
                    <TextField
                        id="perpose"
                        label="Perpose"
                        onChange={(v) => setPerpose(v.target.value)}
                        multiline
                        rows={3}
                        defaultValue={""}
                        sx={{ width: 460 }}
                    />
                    <TextField
                        id="application_route"
                        label="Application Route"
                        onChange={(v) => setApplicationRoute(v.target.value)}
                        multiline
                        rows={3}
                        defaultValue={""}
                        sx={{ width: 460 }}
                    />
                </div>
                <div>
                    <TextField
                        id="etc"
                        label="etc"
                        onChange={(v) => setEtc(v.target.value)}
                        multiline
                        rows={3}
                        defaultValue={""}
                        sx={{ width: 260 }}
                    />
                    <TextField
                        id="history"
                        label="History"
                        onChange={(v) => setHistory(v.target.value)}
                        multiline
                        rows={3}
                        defaultValue={""}
                        sx={{ width: 660 }}
                    />
                </div>
                <div>
                    <TextField
                        id="privateInfo"
                        label="Private Info"
                        onChange={(v) => setPrivateInfo(v.target.value)}
                        defaultValue={""}
                        sx={{ width: 940 }}
                    />
                </div>
            </Box>


        </div>
    );
});

NewResearcherInputs.displayName = "NewResearcherInputs";
export default NewResearcherInputs;