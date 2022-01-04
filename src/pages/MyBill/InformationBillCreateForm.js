import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Search from "../../components/common/Search/Search";
import { validate } from "../../components/common/Validates/ValidateFunctions";
import useStyles from "./styles"
import { groupService } from "../../services/group";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "../../components/common/Alert/Alert";
import { SET_GROUPS_OPTION, SET_MEMBERS_OPTION } from "../../store/actions/types";

function InformationBillCreateForm(props) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const currency = JSON.parse(localStorage.getItem("auth")).currency;

    const [isSnackBarOpen, setSnackBarOpen] = useState({ value: false, message: null, type: "error" });
    const handleCloseSnackBar = () => {
        setSnackBarOpen({ value: false, message: null, type: "error" })
    }

    let [imageLink, setLink] = useState("https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif")
    let [friendsData, setFriendsData] = useState([])
    const auth = useSelector((state) => state.auth)

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await groupService.getMany(auth._id)
                let groupOptions = []
                let friendsList = []
                data.forEach(group => {
                    groupOptions.push({ value: group.id, label: group.name })
                    friendsList.push({ id: group.id, members: group.members })
                })
                dispatch({ type: SET_GROUPS_OPTION, payload: { data: groupOptions } })
                setFriendsData(friendsList)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [])


    const informationBill = props.informationBill

    const require = true

    let textFields = {
        name: { isError: false, message: null },
        total: { isError: false, message: null }
    }
    let [validateField, setValidateField] = useState(textFields)

    useEffect(() => {
        if (informationBill.name === null || informationBill.total === null || validateField.name.isError === true || validateField.total.isError === true) {
            props.isValid(false)
        } else {
            props.isValid(true)
        }
    }, [validateField])

    const handleInput = (e) => {
        let name = e.target.name
        let value = e.target.value
        if (name == "image") {
            value = value.trim()
            if (value === null || value.length === 0) {
                value = "https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif"
                setLink("https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif")
            } else {
                setLink(value)
            }
        } else if (name === "description") {
            value = value.trim()
        }
        props.billInformationControl({ [name]: value })
    }
    const handleSelected = (array) => {
        Object.keys(array).forEach(key => {
            if (key === "groups") {
                if (informationBill.members.length > 0 && (informationBill.groups.value !== array[key].value)) {
                    let beforeMembers = informationBill.members
                    let idFriendsInSelectedGroups = []
                    let group = array[key]
                    friendsData.forEach(groupFriends => {
                        if (group.value === groupFriends.id) {
                            groupFriends.members.forEach(member => {
                                idFriendsInSelectedGroups.push(member._id)
                            })
                        }
                    })
                    beforeMembers.forEach((member, index) => {
                        let isExist = idFriendsInSelectedGroups.filter(id => id === member.value)
                        if (isExist.length === 0) {
                            props.isRightMembers(false)
                            setSnackBarOpen({ value: true, message: `${member.label} must be deleted because not in selected groups!`, type: "error" })
                        }
                    })
                }
                let friendsOfSelectedGroups = []
                let group = array[key]
                friendsData.forEach(groupFriends => {
                    if (group.value === groupFriends.id) {
                        groupFriends.members.forEach(member => {
                            if (friendsOfSelectedGroups.length > 0 && friendsOfSelectedGroups.every(friend => friend.value !== member._id) === true) {
                                friendsOfSelectedGroups.push({ value: member._id, label: member.name })
                            } else if (friendsOfSelectedGroups.length === 0) {
                                friendsOfSelectedGroups.push({ value: member._id, label: member.name })
                            }
                        })
                    }
                })
                dispatch({ type: SET_MEMBERS_OPTION, payload: { data: friendsOfSelectedGroups } })
            } else {
                let idFriendsInSelectedGroups = []
                let group = informationBill.groups
                friendsData.forEach(groupFriends => {
                    if (group.value === groupFriends.id) {
                        groupFriends.members.forEach(member => {
                            idFriendsInSelectedGroups.push(member._id)
                        })
                    }
                })
                let count = 0;
                array[key].forEach((member, index) => {
                    let isExist = idFriendsInSelectedGroups.filter(id => id === member.value)
                    if (isExist.length === 0) {
                        props.isRightMembers(false)
                        count++;
                        setSnackBarOpen({ value: true, message: `${member.label} must be deleted because not in selected groups!`, type: "error" })
                    }
                })
                if (count === 0) {
                    props.isRightMembers(true)
                }
            }
            props.billInformationControl({ [key]: array[key] })
        })
    }
    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={isSnackBarOpen.value}
                autoHideDuration={3000}
                onClose={handleCloseSnackBar}
            >
                <Alert onClose={handleCloseSnackBar} severity={isSnackBarOpen.type}>
                    {isSnackBarOpen.message}
                </Alert>
            </Snackbar>
            <div className={classes.billImageContainer}>
                {informationBill.image ? (
                    <img alt="bill_image" className={classes.billImage} src={informationBill.image || imageLink} />
                ) : (
                    <img alt="bill_image" className={classes.billImage} src='https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif'></img>
                )}
            </div>
            <Grid container spacing={3}>
                <Grid container className={classes.informationDescriptionTextField}>
                    <TextField
                        fullWidth
                        onChange={(e) => {
                            handleInput(e)
                        }}
                        defaultValue={informationBill.image}
                        name="image"
                        id="input-with-icon-grid" label="Image Link" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        error={validateField["name"].isError}
                        helperText={validateField["name"].message}
                        onBlur={(e) => validate(e, validateField, setValidateField, require, "all")}
                        defaultValue={informationBill.name}
                        name="name"
                        onChange={(e) => {
                            handleInput(e)
                            validate(e, validateField, setValidateField, require, "all")
                        }
                        }
                        required
                        id="name"
                        label="Name of Bill" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        error={validateField["total"].isError}
                        helperText={validateField["total"].message}
                        onBlur={(e) => validate(e, validateField, setValidateField, require, "integer")}
                        onChange={(e) => {
                            handleInput(e)
                            validate(e, validateField, setValidateField, require, "integer")
                        }
                        }
                        defaultValue={informationBill.total}
                        required
                        id="totalBill"
                        label={`Total Bill (${currency})`}
                        fullWidth
                        name="total"
                        type="number"
                        autoComplete="cc-number"
                    />
                </Grid>
                <Grid container className={classes.informationDescriptionTextField}>
                    <TextField
                        defaultValue={informationBill.description}
                        id="description"
                        label="Description"
                        fullWidth
                        name="description"
                        autoComplete="cc-number"
                        onChange={(e) => handleInput(e)
                        }
                    />
                </Grid>
                <div className={classes.informationSelectFieldContainer}>
                    <div >Add to a group</div>
                    <div className={classes.informationSelect}>
                        <Search values={informationBill.groups} handleSelected={(array) => handleSelected(array)} name="groups" />
                    </div>
                </div>
                <div className={classes.informationSelectFieldContainer}>
                    <div >Add member</div>
                    <div className={classes.informationSelect}>
                        <Search values={informationBill.members} handleSelected={(array) => handleSelected(array)} name="members" />
                    </div>
                </div>
            </Grid>
        </div>
    );
}

export default InformationBillCreateForm;