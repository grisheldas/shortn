import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { logout } from "@/db/apiAuth";
import { BarLoader, PacmanLoader } from "react-spinners";

function Header() {
  const navigate = useNavigate();

  const { user, fetchUser } = UrlState();

  const { loading, execute: submitLogout } = useFetch(logout);

  return (
    <Fragment>
      <nav className="flex justify-between items-center py-5">
        <Link to={"/"}>
          <img src="/logo.png" className="w-24" alt="Shortn Logo" />
        </Link>

        <div>
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-8 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profilepic}
                    className="object-cover"
                  />
                  <AvatarFallback>{user?.user_metadata?.name}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="mr-2 h-4 w-4 text-red-400" />
                  <span
                    onClick={() => {
                      submitLogout().then(() => {
                        fetchUser();
                        navigate("/");
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>

      {loading && <BarLoader width="100%" color="#777B84" />}
      {/* {true && <PacmanLoader size="25" color="#777B84" />} */}
    </Fragment>
  );
}

export default Header;
