import { useState, useEffect } from "react";
import { Button, CardContent, Typography } from "@mui/material";
import React from "react";
import { LogoComp } from "../../components";
import { Api } from "../../services";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Info } from "../../interface/models";
import { Card } from "@mui/material";

export const ExamplePage = () => {
  // Local State
  const [example, setExample] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [team, setTeam] = useState<Info[]>([]);
  useEffect(() => {
    exampleMethod();
    getTeam();
  }, []);

  async function exampleMethod() {
    try {
      const result = await Api.example();

      setExample(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTeam() {
    try {
      const result = await Api.teamMembers();
      setTeam(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/*      <Typography align="center" variant="h2" mb={5}>
        Invent0ry
      </Typography>*/}

      <LogoComp />

      {example != null ? (
        <Typography>{example}</Typography>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}

      <Button
        variant="contained"
        onClick={() => {
          if (open) setOpen(false);
          else setOpen(true);
        }}
      >
        Show Team Members
      </Button>

      {open &&
        team.map((example) => (
          <Box
            key={`key-${example.name}`}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h4"> name: {example.name}</Typography>
                <Typography variant="h4">
                  {" "}
                  username: {example.username}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
    </Box>
  );
};
