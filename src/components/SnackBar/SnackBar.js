import React from "react"
import './SnackBar.css'
import { FormattedMessage } from 'react-intl';

const SnackBar = React.forwardRef(({ ...props }, ref) => {
    const [displaySnackBar, setDisplaySnackBar] = React.useState(false)
    const [snackBarProps, setSnackBarProps] = React.useState({})

    const fireSnackBar = (snackBarProps) => {
        setSnackBarProps(snackBarProps)
        setDisplaySnackBar(true)
        const timer = setTimeout(() => {
            setDisplaySnackBar(false)
        }, 2500);
        return () => clearTimeout(timer);
    }

    React.useImperativeHandle(ref, () => ({
        fireSnackBar: fireSnackBar
    }), [])

    return (
        displaySnackBar && <div className={`snackbar-root ${snackBarProps.type === "success" ? "snackbar-success" : "snackbar-fail"}`}>
            <span className={`m-auto ${snackBarProps.type === "success" ? "snackbar-success" : "snackbar-fail"}`}><FormattedMessage id={snackBarProps.message} /></span>
        </div>
    )
});

export default SnackBar;