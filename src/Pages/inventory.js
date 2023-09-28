import React, { useState, useEffect } from 'react';

const InventoryManagement = () => {

    const [data, setData] = useState([
        {
            id: 1,
            name: 'Tomato',
            category: 'Vegetable',
            unitOfMeasurement: 'kg',
            currentStock: 90,
            minStockThreshold: 50,
            reorderQuantity: 100,
            unitCost: 20,
            lastUpdated: '9/28/2023',
        },
        {
            id: 2,
            name: 'Onion',
            category: 'Vegetable',
            unitOfMeasurement: 'kg',
            currentStock: 30,
            minStockThreshold: 50,
            reorderQuantity: 150,
            unitCost: 17,
            lastUpdated: '9/28/2023',
        },
        {
            id: 3,
            name: 'Potato',
            category: 'Vegetable',
            unitOfMeasurement: 'kg',
            currentStock: 200,
            minStockThreshold: 50,
            reorderQuantity: 150,
            unitCost: 15,
            lastUpdated: '9/28/2023',
        },
        {
            id: 4,
            name: 'Corriander',
            category: 'Vegetable',
            unitOfMeasurement: '1 bunch',
            currentStock: 30,
            minStockThreshold: 25,
            reorderQuantity: 50,
            unitCost: 20,
            lastUpdated: '9/28/2023',
        },
        {
            id: 5,
            name: 'Garlic',
            category: 'Vegetable',
            unitOfMeasurement: '200gm',
            currentStock: 20,
            minStockThreshold: 25,
            reorderQuantity: 50,
            unitCost: 62,
            lastUpdated: '9/28/2023',
        },
        // Add more data entries as needed
    ]);

    const [newCommodity, setNewCommodity] = useState({
        id: '',
        name: '',
        category: '',
        unitOfMeasurement: '',
        currentStock: '',
        minStockThreshold: '',
        reorderQuantity: '',
        unitCost: '',
    });

    const calculateTotalCost = (item) => {
        // Check if unitCost is a valid number
        if (!isNaN(item.unitCost)) {
            return (item.currentStock * parseFloat(item.unitCost)).toFixed(2);
        } else {
            return 'N/A';
        }
    };

    const handleAddCommodity = () => {
        const newCommodityWithId = {
            ...newCommodity,
            id: data.length + 1,
            currentStock: parseInt(newCommodity.currentStock, 10), // Parse to integer
            minStockThreshold: parseInt(newCommodity.minStockThreshold, 10), // Parse to integer
            reorderQuantity: parseInt(newCommodity.reorderQuantity, 10), // Parse to integer
            unitCost: parseFloat(newCommodity.unitCost), // Parse to float
            lastUpdated: new Date().toLocaleDateString(),
        };

        setData([...data, newCommodityWithId]);

        setNewCommodity({
            id: '',
            name: '',
            category: '',
            unitOfMeasurement: '',
            currentStock: '',
            minStockThreshold: '',
            reorderQuantity: '',
            unitCost: '',
        });
    };

    const [totalReorderItems, setTotalReorderItems] = useState(0);
    const [totalOutOfStock, setTotalOutOfStock] = useState(0);
    const [totalStockCost, setTotalStockCost] = useState(0);

    useEffect(() => {
        // Calculate summary values here
        const totalReorderItems = data.filter((item) => item.currentStock < item.minStockThreshold).length;
        const totalOutOfStock = data.filter((item) => item.currentStock === 0).length;
        const totalStockCost = data.reduce((acc, item) => {
            const cost = parseFloat(item.unitCost) * item.currentStock;
            return isNaN(cost) ? acc : acc + cost;
        }, 0);

        setTotalReorderItems(totalReorderItems);
        setTotalOutOfStock(totalOutOfStock);
        console.log("Out of Stock:", totalOutOfStock);
        console.log("Re order", totalReorderItems);
        console.log('Total Stock Cost Before:', totalStockCost.toFixed(2));
        setTotalStockCost(totalStockCost.toFixed(2));
        console.log('Total Stock Cost After:', totalStockCost.toFixed(2));
        // You can set these values in state or display them directly in the summary divs


    }, [data]);

    return (
        <div>
            <div className="mx-auto max-w-7xl p-6 rounded-lg shadow-md bg-white">
            <header className="bg-gray-800 p-4 text-white text-center rounded-lg mb-4">
        <h1 className="text-4xl font-semibold">Inventory</h1>
      </header>

                {/* Commodity Input Form */}
                <div className="mb-4 md:flex md:flex-wrap md:space-x-4">
                    <input
                        type="text"
                        placeholder="Commodity ID"
                        className="border rounded-lg p-2 mr-2 "
                        value={newCommodity.id}
                        onChange={(e) => setNewCommodity({ ...newCommodity, id: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Commodity Name"
                        className="border rounded-lg p-2 mr-2"
                        value={newCommodity.name}
                        onChange={(e) => setNewCommodity({ ...newCommodity, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        className="border rounded-lg p-2 mr-2"
                        value={newCommodity.category}
                        onChange={(e) => setNewCommodity({ ...newCommodity, category: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Unit of Measurement"
                        className="border rounded-lg p-2 mr-2"
                        value={newCommodity.unitOfMeasurement}
                        onChange={(e) => setNewCommodity({ ...newCommodity, unitOfMeasurement: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Current Stock"
                        className="border rounded-lg p-2 mr-2"
                        value={newCommodity.currentStock}
                        onChange={(e) => setNewCommodity({ ...newCommodity, currentStock: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Min Stock Threshold"
                        className="border rounded-lg p-2 mr-2 mt-2"
                        value={newCommodity.minStockThreshold}
                        onChange={(e) => setNewCommodity({ ...newCommodity, minStockThreshold: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Reorder Quantity"
                        className="border rounded-lg p-2 mr-2 mt-2"
                        value={newCommodity.reorderQuantity}
                        onChange={(e) => setNewCommodity({ ...newCommodity, reorderQuantity: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Unit Cost"
                        className="border rounded-lg p-2 mr-2 mt-2"
                        value={newCommodity.unitCost}
                        onChange={(e) => setNewCommodity({ ...newCommodity, unitCost: e.target.value })}
                    />
                    <button
                        onClick={handleAddCommodity}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer mt-2"
                    >
                        Add Commodity
                    </button>
                </div>


                {/* Summary Divs */}
                <div className="flex mb-4 space-x-4">
                    <div className="flex-1 p-4 border rounded-lg bg-blue-100">
                        <div className="text-xl font-semibold text-blue-700">Reorder Items</div>
                        <div className="text-2xl text-blue-900">{totalReorderItems}</div>
                    </div>
                    <div className="flex-1 p-4 border rounded-lg bg-red-100">
                        <div className="text-xl font-semibold text-red-700">Out of Stock</div>
                        <div className="text-2xl text-red-900">{totalOutOfStock}</div>
                    </div>
                    <div className="flex-1 p-4 border rounded-lg bg-yellow-100">
                        <div className="text-xl font-semibold text-yellow-700">Stock Cost</div>
                        <div className="text-2xl text-yellow-900">₹{totalStockCost}</div>
                    </div>
                </div>


                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] table-auto rounded-lg bg-green-50">
                        <thead className="bg-green-100">
                            <tr>
                                {[
                                    "Commodity ID",
                                    "Commodity Name",
                                    "Category",
                                    "Unit of Measurement",
                                    "Current Stock",
                                    "Min Stock Threshold",
                                    "Reorder Quantity",
                                    "Unit Cost",
                                    "Total Cost",
                                    "Last Updated",
                                    "    Alerts    ",
                                ].map((el, index) => (
                                    <th
                                        key={index}
                                        className={`border-b border-green-200 py-3 px-6 text-left ${index === 11 ? "" : "text-sm font-medium text-green-500"
                                            }`}
                                    >
                                        {el}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id} className="py-3 px-5 border-b border-green-200">
                                    <td className="py-2 px-4 border-b border-green-200 hover:bg-green-50">{item.id}</td>
                                    <td className="py-2 px-4 border-b border-green-200 hover:bg-green-50">{item.name}</td>
                                    <td className="py-2 px-4 border-b border-green-200 hover:bg-green-50">{item.category}</td>
                                    <td className="py-2 px-4 border-b border-green-200 hover:bg-green-50">{item.unitOfMeasurement}</td>
                                    <td className="py-2 px-4 border-b border-green-200 hover:bg-green-50">{item.currentStock}</td>
                                    <td className="py-2 px-4 border-b border-green-200 hover:bg-green-50">{item.minStockThreshold}</td>
                                    <td className="py-2 px-4 border-b border-green-200 hover:bg-green-50">{item.reorderQuantity}</td>
                                    <td className="py-2 px-4 border-b border-green-200 hover:bg-green-50">₹{item.unitCost.toFixed(2)}</td>
                                    <td className="py-2 px-4 border-b border-green-200 hover:bg-green-50">₹{(item.currentStock * item.unitCost).toFixed(2)}</td>
                                    <td className="py-2 px-4 border-b border-green-200 hover:bg-green-50">{item.lastUpdated}</td>
                                    {item.currentStock >= item.minStockThreshold && (
                                        <td className="py-2 font-semibold">
                                            <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                                Sufficient Stock
                                            </div>
                                        </td>
                                    )}

                                    {item.currentStock < item.minStockThreshold && (
                                        <td className="py-2 font-semibold">
                                            <div className="bg-red-100 text-red-700 px-2 py-1 rounded">
                                                Low Stock Alert
                                            </div>
                                        </td>
                                    )}

                                    {item.currentStock === 0 && (
                                        <td className="py-2 font-semibold">
                                            <div className="bg-red-100 text-red-700 px-2 py-1 rounded">
                                                Out of Stock Alert
                                            </div>
                                        </td>
                                    )}

                                    {item.currentStock < item.minStockThreshold && (
                                        <td className="py-2 font-semibold">
                                            <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                                Reorder Suggestion: Order {item.reorderQuantity} units
                                            </div>
                                        </td>
                                    )}

                                    {item.currentStock >= item.reorderQuantity && (
                                        <td className="py-2 font-semibold">
                                            <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                                Stock Above Reorder Quantity
                                            </div>
                                        </td>
                                    )}



                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InventoryManagement;