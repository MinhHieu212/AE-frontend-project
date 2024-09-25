import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  initializeCombinations,
  updateCombinationFieldValue,
} from "../../../../store/slices/variantsSlice";

const ProdVariantTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const variants = useAppSelector((state) => state.variants.variants);
  const haveVariants = useAppSelector((state) => state.product.haveVariants);
  const combineVariantsTable = useAppSelector(
    (state) => state.variants.combineVariantsTable
  );

  const handleInputChange = (index: number, field: string, value: string) => {
    dispatch(updateCombinationFieldValue({ index, field, value }));
  };

  useEffect(() => {
    dispatch(initializeCombinations(variants));
  }, [variants]);

  if (!haveVariants) return <></>;

  return (
    <div className="w-full rounded-lg p-5">
      <p className="font-medium text-lg">
        Product Variants Table{" "}
        <span className="text-gray-400 font-normal text-[16px]">
          (pricing, quantity)
        </span>
        <span className="text-red-600"> *</span>
      </p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow className="border-2 border-solid border-gray-200">
              <StyledTableCell className="uppercase" align="center">
                #
              </StyledTableCell>
              {variants.map((item, index) => (
                <StyledTableCell
                  className="uppercase"
                  align="center"
                  key={index}
                >
                  {item.type}
                </StyledTableCell>
              ))}
              <StyledTableCell className="uppercase" align="center">
                Price
              </StyledTableCell>
              <StyledTableCell className="uppercase" align="center">
                Mrsp Price
              </StyledTableCell>
              <StyledTableCell className="uppercase" align="center">
                Sale Price
              </StyledTableCell>
              <StyledTableCell className="uppercase" align="center">
                Quantity
              </StyledTableCell>
              <StyledTableCell className="uppercase" align="center">
                Quantity
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {combineVariantsTable.map((combination, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                {variants.map((variant, idx) => (
                  <StyledTableCell key={idx} align="center">
                    {combination[variant.type]}
                  </StyledTableCell>
                ))}
                <StyledTableCell align="center">
                  <TextField
                    id={`price-${index}`}
                    label="Price"
                    type="number"
                    size="small"
                    className="max-w-[150px]"
                    value={combination.price === 0 ? null : combination.price}
                    onChange={(e) =>
                      handleInputChange(index, "price", e.target.value)
                    }
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    id={`mrspPrice-${index}`}
                    label="Mrsp Price"
                    type="number"
                    size="small"
                    className="max-w-[150px]"
                    value={
                      combination.mrspPrice === 0 ? null : combination.mrspPrice
                    }
                    onChange={(e) =>
                      handleInputChange(index, "mrspPrice", e.target.value)
                    }
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    id={`salePrice-${index}`}
                    label="Sale Price"
                    type="number"
                    size="small"
                    className="max-w-[150px]"
                    value={
                      combination.salePrice === 0 ? null : combination.salePrice
                    }
                    onChange={(e) =>
                      handleInputChange(index, "salePrice", e.target.value)
                    }
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    id={`quantity-${index}`}
                    label="Quantity"
                    type="number"
                    size="small"
                    className="max-w-[150px]"
                    value={
                      combination.quantity === 0 ? null : combination.quantity
                    }
                    onChange={(e) =>
                      handleInputChange(index, "quantity", e.target.value)
                    }
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    id={`sku-${index}`}
                    label="sku"
                    type="text"
                    size="small"
                    className="max-w-[150px]"
                    value={combination.sku}
                    onChange={(e) =>
                      handleInputChange(index, "sku", e.target.value)
                    }
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    fontWeight: "semibold",
    color: "gray",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default ProdVariantTable;
