/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
} from "@tabler/icons-react";
import classes from "../styles/HeaderMegaMenu.module.css";
import { ActionToggle } from "./Toggle";
import Link from "next/link";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useSession,
} from "@clerk/nextjs";
const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémons cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargles tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shells rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const { session } = useSession();

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <MantineLogo size={30} />
          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <Link href="/" className={classes.link}>
              See All Recipe
            </Link>
            {session && (
              <Link href="/users/forms" className={classes.link}>
                Add Recipe
              </Link>
            )}
          </Group>

          <Group visibleFrom="sm">
            <ActionToggle />
            <Button variant="default">
              {session ? <SignOutButton /> : <SignInButton />}
            </Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <Link href="/" className={classes.link}>
            Home
          </Link>
          {session && (
            <Link href="/users/forms" className={classes.link}>
              Add Recipe
            </Link>
          )}

          <Group justify="center" grow pb="xl" px="md">
            <ActionToggle />
            {session ? <SignOutButton /> : <SignInButton />}

            {/* <Button onClick={}></Button> */}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
