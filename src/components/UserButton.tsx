import { UnstyledButton, Group, Avatar, Text, rem, Menu } from "@mantine/core";
import {
  IconChevronRight,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import classes from "../styles/UserButton.module.css";
import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/clerk-react";

export function UserButtons() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <>
      <UnstyledButton className={classes.user}>
        <Group>
          <Avatar src={user?.imageUrl} radius="xl" />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              {user?.username}
            </Text>
          </div>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <IconChevronRight
                style={{ width: rem(14), height: rem(14) }}
                stroke={1.5}
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Settings
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconMessageCircle
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
              >
                Messages
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconPhoto style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Gallery
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconSearch style={{ width: rem(14), height: rem(14) }} />
                }
                rightSection={
                  <Text size="xs" c="dimmed">
                    ⌘K
                  </Text>
                }
              >
                Search
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                color="red"
                leftSection={
                  <IconLogout style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => signOut()}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </UnstyledButton>
    </>
  );
}
