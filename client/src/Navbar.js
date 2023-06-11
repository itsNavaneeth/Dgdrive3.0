import React, { ReactNode } from 'react';
import {
  Button, IconButton, Avatar, Box, CloseButton, Flex, HStack, VStack, Icon, useColorModeValue, useColorMode, Link, Drawer, DrawerContent, Text, useDisclosure, BoxProps, FlexProps, Menu, MenuButton, MenuDivider, MenuItem, MenuList
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import { FiSun } from 'react-icons/fi';
import { BsFillMoonFill } from 'react-icons/bs';
import { BsFiles, BsFillPeopleFill } from 'react-icons/bs';
import { FaShareAlt, FaServer } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdInfo } from 'react-icons/md';
import { TiPlus } from 'react-icons/ti';
import { Link as Navlink, Outlet, useLocation } from "react-router-dom"


const LinkItems = [
  { name: 'Upload', icon: TiPlus, to: "/upload" },
  { name: 'My Files', icon: FaServer, to: "/my-files" },
  { name: 'Shared With Me', icon: FaShareAlt, to: "/shared-files" },
  { name: 'My Peers', icon: BsFillPeopleFill, to: "my-peers" },
  { name: 'About', icon: MdInfo, to: "about" },
];

export default function SidebarWithHeader({
  children,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
        <Outlet />
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const pa = useLocation();
  let sidebarBg =
    "linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)";
  return (
    <Box
      transition="3s ease"
      // bg={useColorModeValue('white', 'gray.900')}
      bg={sidebarBg}
      backdropFilter='blur(10px)'
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link
          // as={Navlink}
          href="/"
          style={{ textDecoration: 'none' }}
        // to="/"
        >
          <Text decoration="none" fontSize="lg" fontFamily={'Open Sans'} fontWeight="bold" bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>
            K R Y P T O N
          </Text>
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to} isActive={pa.pathname === link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ to, icon, children, isActive, ...rest }) => {
  const activeStyles = {
    // bg: '#40128B',
    bgGradient: 'linear(to right, #ff00cc, #333399)',
    color: 'white',
  };
  const hoverStyles = {
    bg: '#1A1F37',
    color: 'white',
  };
  return (
    <Link
      as={Navlink}
      to={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius='15px'
        role="group"
        cursor="pointer"
        _hover={hoverStyles}
        {...(isActive && activeStyles)}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Krypton
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton onClick={toggleColorMode} mx={2} isRound>
          {colorMode === "light" ? <BsFillMoonFill /> : <FiSun />}
        </IconButton>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/330px-Elon_Musk_Royal_Society_%28crop2%29.jpg"
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Elon Musk</Text>
                  <Text fontSize="xs" color="gray.600">
                    User
                  </Text>
                </VStack>
              </HStack>
            </MenuButton>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
