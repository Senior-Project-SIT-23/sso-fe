import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { IconButton } from '@material-ui/core'
import { Done, Close } from '@material-ui/icons'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 450,
  },
})

export default function StickyHeadTable(props) {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {props.columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ maxWidth: column.width }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {props.columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          maxWidth: column.width,
                          whiteSpace: 'normal',
                          wordBreak: 'break-word',
                        }}
                      >
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                        {column.action && (
                          <>
                            <IconButton onClick={() => props.handleAction(row.id, true)}>
                              <Done />
                            </IconButton>
                            <IconButton onClick={() => props.handleAction(row.id, false)}>
                              <Close />
                            </IconButton>
                          </>
                        )}
                        {column.delete && (
                          <>
                            <IconButton onClick={() => props.handleAction(row.id, false)}>
                              <Close />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}