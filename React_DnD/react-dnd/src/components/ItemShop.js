import { useEffect, useState } from "react";
import { getAllCharacters } from "../Application/services/getAllCharacters.js";
import { buyItem, sellItem } from "../Application/services/ItemShopService.js";
import { ITEM_DATA } from "../domain/Item/index.js";

function ItemShop() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharId, setSelectedCharId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const chars = await getAllCharacters();
        setCharacters(chars);
        if (chars.length > 0) {
          setSelectedCharId(chars[0].charId);
        }
      } catch (err) {
        setError("Failed to load characters: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    loadCharacters();
  }, []);

  const selectedCharacter = characters.find((c) => c.charId === selectedCharId);

  const handleBuyItem = async (itemId) => {
    if (!selectedCharacter) {
      alert("Please select a character first");
      return;
    }
    try {
      const updated = await buyItem(selectedCharacter, itemId);
      setCharacters((prev) =>
        prev.map((c) => (c.charId === updated.charId ? updated : c))
      );
      alert("Item purchased!");
    } catch (err) {
      alert("Purchase failed: " + err.message);
    }
  };

  const handleSellItem = async (itemId) => {
    if (!selectedCharacter) {
      alert("Please select a character first");
      return;
    }
    try {
      const updated = await sellItem(selectedCharacter, itemId);
      setCharacters((prev) =>
        prev.map((c) => (c.charId === updated.charId ? updated : c))
      );
      alert("Item sold!");
    } catch (err) {
      alert("Sale failed: " + err.message);
    }
  };

  if (loading) return <div>Loading characters...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Item Shop</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Select Character:
          <select
            value={selectedCharId}
            onChange={(e) => setSelectedCharId(e.target.value)}
          >
            {characters.map((char) => (
              <option key={char.charId} value={char.charId}>
                {char.name} (Level {char.level})
              </option>
            ))}
          </select>
        </label>
      </div>

      {selectedCharacter && (
        <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h3>{selectedCharacter.name}</h3>
          <p>Gold: {selectedCharacter.wallet?.gp || 0} gp</p>
          <p>
            Inventory: {selectedCharacter.inventory?.length || 0} items
          </p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Shop Section */}
        <div style={{ border: "1px solid #999", padding: "15px", borderRadius: "8px" }}>
          <h3>Available Items</h3>
          <div style={{ overflowY: "auto", maxHeight: "400px" }}>
            {Object.entries(ITEM_DATA).map(([itemId, itemData]) => (
              <div
                key={itemId}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "8px",
                  borderRadius: "4px",
                }}
              >
                <strong>{itemData.name}</strong> ({itemData.type})
                <p>Price: {itemData.value?.gp || 0} gp</p>
                <button
                  onClick={() => handleBuyItem(itemId)}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Section */}
        <div style={{ border: "1px solid #999", padding: "15px", borderRadius: "8px" }}>
          <h3>Your Inventory</h3>
          <div style={{ overflowY: "auto", maxHeight: "400px" }}>
            {selectedCharacter && selectedCharacter.inventory && selectedCharacter.inventory.length > 0 ? (
              selectedCharacter.inventory.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    marginBottom: "8px",
                    borderRadius: "4px",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <strong>{item.name}</strong> ({item.type})
                  <p>Sell for: {Math.floor((item.value?.gp || 0) / 2)} gp</p>
                  <button
                    onClick={() => handleSellItem(item.id)}
                    style={{
                      backgroundColor: "#ff9800",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Sell
                  </button>
                </div>
              ))
            ) : (
              <p>No items in inventory</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemShop;
