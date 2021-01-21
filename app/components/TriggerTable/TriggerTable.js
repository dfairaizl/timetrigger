import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import TriggerTableRow from "../TriggerTableRow/TriggerTableRow";

const styles = () => ({});

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  const firstPageButton = () => {
    if (!isMobile) {
      return (
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
      );
    }
  };

  const lastPageButton = () => {
    if (!isMobile) {
      return (
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      );
    }
  };

  return (
    <div className={classes.root}>
      {firstPageButton()}
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      {lastPageButton()}
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function TriggerTable(props) {
  const { data } = props;
  const triggerData = data.sort(
    (t1, t2) => t1.trigger_at.toDate() > t2.trigger_at.toDate()
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const [pageSize, setPageSize] = useState(10);
  const [dataPage, setDataPage] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const offset = page * pageSize;
    const dataPage = triggerData.slice(offset, offset + pageSize);
    setDataPage(dataPage);
  }, [triggerData, pageSize, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const num = parseInt(event.target.value, 10);
    setPageSize(num);
  };

  const renderHeader = () => {
    return (
      <React.Fragment>
        <TableCell>Trigger Time</TableCell>
        <TableCell align="center">Job Type</TableCell>
        <TableCell align="center">Status</TableCell>
      </React.Fragment>
    );
  };

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>{isMobile ? null : renderHeader()}</TableRow>
        </TableHead>
        <TableBody>
          {dataPage.map((row) => (
            <TriggerTableRow key={row.id} data={row} isMobile={isMobile} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              colSpan={3}
              labelRowsPerPage={"Display"}
              count={triggerData.length}
              rowsPerPage={pageSize}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
}

TriggerTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(TriggerTable);
