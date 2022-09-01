import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { BetPlaced } from "../generated/Game/Game"

export function createBetPlacedEvent(
  player: Address,
  value: BigInt,
  hasWon: boolean
): BetPlaced {
  let betPlacedEvent = changetype<BetPlaced>(newMockEvent())

  betPlacedEvent.parameters = new Array()

  betPlacedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  betPlacedEvent.parameters.push(
    new ethereum.EventParam("hasWon", ethereum.Value.fromBoolean(hasWon))
  )

  return betPlacedEvent
}
