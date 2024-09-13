import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "../../../../store/store";
import { TextField, Button } from "@mui/material";

interface CombinationObject {
  [key: string]: string;
  price: string;
  salePrice: string;
  quantity: string;
}

const ProdVariantTable: React.FC = () => {
  const phone_variant = useAppSelector((state) => state.variants.phone_variant);
  const [combinations, setCombinations] = useState<CombinationObject[]>([]);

  const generateCombinations = (arrays: string[][]): string[][] => {
    const result: string[][] = [];

    const combine = (index: number, current: string[]) => {
      if (index === arrays?.length) {
        result.push(current);
        return;
      }

      for (let i = 0; i < arrays[index]?.length; i++) {
        combine(index + 1, [...current, arrays[index][i]]);
      }
    };

    combine(0, []);
    return result;
  };

  const variants: { [key: string]: string[] } = phone_variant.reduce(
    (acc: { [key: string]: string[] }, variant: any) => {
      acc[variant.type] = variant.values;
      return acc;
    },
    {}
  );

  React.useEffect(() => {
    const allCombinations = generateCombinations(Object.values(variants));
    const initialCombinations: CombinationObject[] = allCombinations.map(
      (combination) => {
        const combinationObject: CombinationObject = {
          price: "",
          salePrice: "",
          quantity: "",
        };

        Object.keys(variants).forEach((key, index) => {
          combinationObject[key] = combination[index];
        });

        return combinationObject;
      }
    );
    setCombinations(initialCombinations);
  }, [phone_variant]);

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedCombinations = [...combinations];
    updatedCombinations[index][field] = value;
    setCombinations(updatedCombinations);
  };

  const handleSave = () => {
    // Here you would typically dispatch an action to save the data to your store or send it to an API
    console.log("Saving data:", combinations);
    // Example: dispatch(saveVariantData(combinations));
  };

  return (
    <div className="w-full rounded-lg mb-2 p-5">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className="uppercase" align="center">
                #
              </StyledTableCell>
              {phone_variant.map((item: any, index: number) => (
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
                Sale Price
              </StyledTableCell>
              <StyledTableCell className="uppercase" align="center">
                Quantity
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {combinations.map((combination, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                {Object.keys(variants).map((key, idx) => (
                  <StyledTableCell key={idx} align="center">
                    {combination[key]}
                  </StyledTableCell>
                ))}
                <StyledTableCell align="center">
                  <TextField
                    id={`price-${index}`}
                    label="Price"
                    type="number"
                    size="small"
                    className="max-w-[150px]"
                    value={combination.price}
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
                    id={`salePrice-${index}`}
                    label="Sale Price"
                    type="number"
                    size="small"
                    className="max-w-[150px]"
                    value={combination.salePrice}
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
                    className="max-w-[120px]"
                    value={combination.quantity}
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
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        className="mt-4"
      >
        Save Data
      </Button>
    </div>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    fontWeight: "semibold",
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
