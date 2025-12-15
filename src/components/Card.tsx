"use client"

import { useDispatch } from "react-redux";
import { add, remove } from "../lib/redux/cardSlice";
import React, { useState } from "react";
import { Box, IconButton, Menu, Modal } from "@mui/material";
import { FaEllipsisV } from "react-icons/fa";
import Swal from "sweetalert2";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface Item {
    id: number;
    nodeName: string;
    nodes: Item[];
}


export default function Card({ item }: { item: Item }) {

    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [nameValue, setNameValue] = useState('');

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const menuOpen = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setModalOpen(false)
    };


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value)
        setNameValue(e.target.value)
    }
    const handleAdd = () => {
        dispatch(add({ id: item.id, nodeName: nameValue }))
        setNameValue('')
        handleMenuClose()
    }
    const handleRemove = () => {
        handleMenuClose()
        Swal.fire({
            title: "You want to delete this node?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"

        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(remove({ id: item.id }))
                Swal.fire({
                    title: "Deleted!",
                    text: "Node has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="my-1">
            <div className="flex gap-4 items-center bg-slate-100 rounded px-2 py-1 w-fit">
                <h1>{item.nodeName}</h1>
                <div>
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={menuOpen ? 'long-menu' : undefined}
                        aria-expanded={menuOpen ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <FaEllipsisV />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={handleMenuClose}
                        slotProps={{
                            paper: {
                                style: {
                                    maxHeight: 400,
                                    width: '20ch',
                                },
                            },
                            list: {
                                'aria-labelledby': 'long-button',
                            },
                        }}
                    >

                        <button onClick={handleModalOpen}
                            className="w-full bg-emerald-500 text-white px-2 py-1 rounded cursor-pointer mb-2"
                        >add</button>
                        <Modal
                            open={modalOpen}
                            onClose={handleModalClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <div className="flex items-center gap-4">
                                    <input onChange={(e) => handleNameChange(e)}
                                        value={nameValue}
                                        placeholder="Node Name"
                                        className="border rounded p-2"
                                    />
                                    <button onClick={handleAdd}
                                        className=" bg-emerald-500 text-white px-2 py-1 rounded cursor-pointer"
                                    >Submit</button>
                                </div>
                            </Box>
                        </Modal>
                        <button onClick={handleRemove}
                            disabled={item.id === 1}
                            className="w-full bg-rose-500 text-white px-2 py-1 rounded disabled:bg-gray-200 disabled:text-gray-600 cursor-pointer"
                        >delete</button>
                    </Menu>
                </div>
            </div>
            <div className="ml-8 border-l px-1">
                {
                    item.nodes.length > 0 && item.nodes.map(item => <Card key={item.id} item={item} />)
                }
            </div>
        </div>
    )
}
