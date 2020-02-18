import { createSelector } from 'reselect'
import uniqBy from 'lodash.uniqby'

import { userAllFacilitiesSelector, userFacilitySelector } from './user'

export const foundationSelector = state => state.foundation

export const foundationContractsSelector = createSelector(
  foundationSelector,
  foundation => foundation.all
)

export const foundationOrganizationContractsSelector = createSelector(
  foundationSelector,
  foundation => foundation.organizationContracts
)

export const foundationContractTypesSelector = createSelector(
  foundationSelector,
  foundation => foundation.contractTypes
)

export const foundationHumanizedOrganizationContractsSelector = createSelector(
  foundationOrganizationContractsSelector,
  userAllFacilitiesSelector,
  foundationContractTypesSelector,
  (contracts, facilities, types) => {
    return contracts.map(({ contractTypeId, facilityId, sport, ...rest }) => {
      const type = types.find(({ id: _typeId }) => _typeId === contractTypeId)
      const facility = facilities.find(
        ({ id: _facilityId }) => _facilityId === facilityId
      )

      return {
        ...rest,
        facility,
        sport,
        type,
      }
    })
  }
)

export const foundationAllFacilitiesWithContractsSelector = createSelector(
  userAllFacilitiesSelector,
  foundationOrganizationContractsSelector,
  (allFacilities = [], organizationContracts = []) => {
    return (
      allFacilities.filter(
        ({ id }) =>
          !!organizationContracts.find(({ facilityId }) => id === facilityId)
      ) || []
    )
  }
)

export const foundationOrganizationsWithContracts = createSelector(
  foundationContractsSelector,
  userFacilitySelector,
  (contracts, userFacility) => {
    const uniqContracts = [
      ...uniqBy(contracts, contract => contract.organizationId),
    ]

    if (Object.keys(userFacility).length > 0) {
      uniqContracts.push({
        organizationName: userFacility.name,
        organizationTin: userFacility.tin,
        id: userFacility.id,
        organizationId: userFacility.id,
      })
    }

    return uniqContracts.map(contract => ({
      ...contract,
      title: contract.organizationName /* for backward compatibility */,
    }))
  }
)

export const foundationCurrentContractsSelector = createSelector(
  foundationSelector,
  foundation => foundation.contracts
)

export const foundationContractOrganizationSelector = createSelector(
  foundationSelector,
  foundation => foundation.contractOrganization
)

export const foundationOrgTypesSelector = createSelector(
  foundationSelector,
  foundation => foundation.orgTypes
)

export const foundationIsModalOpenSelector = createSelector(
  foundationSelector,
  foundation => foundation.isModalOpen
)

export const foundationCurrentContractSelector = createSelector(
  foundationSelector,
  foundation => foundation.currentContract
)

export const foundationTotalSelector = createSelector(
  foundationSelector,
  foundation => foundation.total
)

export const foundationPageSizeSelector = createSelector(
  foundationSelector,
  foundation => foundation.pageSize
)

export const foundationPagesSelector = createSelector(
  foundationSelector,
  foundation => foundation.pages
)

export const foundationCurrentPageSelector = createSelector(
  foundationSelector,
  foundation => foundation.currentPage
)

export const foundationTypeFilterSelector = createSelector(
  foundationSelector,
  foundation => foundation.typeFilter
)

export const foundationSportFilterSelector = createSelector(
  foundationSelector,
  foundation => foundation.sportFilter
)

export const foundationLoadingSelector = createSelector(
  foundationSelector,
  foundation => foundation.loading
)

export const foundationAllowedSportsSelector = createSelector(
  foundationSelector,
  foundation => foundation.allowedSports
)

export const foundationAllowedTypesSelector = createSelector(
  foundationSelector,
  foundation => foundation.allowedTypes
)
