import colors from "./colors"
import {Theme, SxProps} from '@mui/material'

export const HeaderStyles: SxProps<Theme> = {
    position: "relative",
    paddingLeft: "100px",
    boxShadow: "0 0 30px 0 rgba(0, 0, 0, 0.9), 0 2px 4px 0 rgba(0, 0, 0, 0.5)",
    backgroundColor: colors.PRIMARY_HEADER_COLOR,
    height: "15px"

    // borderBottom: 0.5,
    // borderColor: colors.PRIMARY_HEADER_BOTTOM_BORDER_COLOR
}