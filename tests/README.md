# Tests Directory

## 📁 Structure

```
tests/
├── unit/                          # Unit tests for individual components
│   └── components/
│       ├── ui/                    # UI component tests
│       │   ├── Button/
│       │   │   └── CustomButton.spec.ts
│       │   ├── Input/
│       │   │   └── CustomInput.spec.ts
│       │   ├── Dialog/
│       │   │   └── NativeModal.spec.ts
│       │   └── Pagination/
│       │       └── Pagination.spec.ts
│       └── app/                   # Application component tests
└── shared/                        # Shared test utilities
    └── test-utils.ts             # Common test helpers and fixtures
```

## 🧪 Test Organization

### Best Practices Applied

1. **Mirror Source Structure**: Test files are organized to mirror the `src/components/` structure
2. **Separation of Concerns**: Tests are grouped by component type (UI, App)
3. **Shared Utilities**: Common test helpers are centralized in `tests/shared/`
4. **Descriptive Names**: Each test file clearly indicates what it tests

## 📝 Test Files

### `tests/unit/components/ui/Button/CustomButton.spec.ts`
- 6 unit tests for CustomButton component
- Tests: rendering, events, props, disabled state

### `tests/unit/components/ui/Input/CustomInput.spec.ts`
- 9 unit tests for CustomInput component
- Tests: rendering, v-model binding, validation, error states

### `tests/unit/components/ui/Dialog/NativeModal.spec.ts`
- 9 unit tests for NativeModal component
- Tests: visibility, slots, events, overlay behavior

### `tests/unit/components/ui/Pagination/Pagination.spec.ts`
- 6 unit tests for Pagination component
- Tests: button rendering, state management, event emission

## 🛠️ Test Utils

### `tests/shared/test-utils.ts`

Provides common utilities for testing:

```typescript
// Configure i18n for tests
export const i18n

// Helper function to mount components with i18n
export function mountWithI18n(component, options)
```

Usage example:
```typescript
import { mountWithI18n } from '../../shared/test-utils';

const wrapper = mountWithI18n(CustomInput, {
  props: { required: true }
});
```

## 🚀 Running Tests

```bash
# Run all tests (watch mode)
npm run test

# Run all tests once
npm run test -- --run

# Run specific test file
npm run test -- CustomButton.spec.ts

# Run tests with UI dashboard
npm run test:ui

# Run tests with coverage
npm run test -- --coverage
```

## 📊 Current Test Coverage

| Component | Tests | Status |
|-----------|-------|--------|
| CustomButton | 6 | ✅ Passing |
| CustomInput | 9 | ✅ Passing |
| NativeModal | 9 | ✅ Passing |
| Pagination | 6 | ✅ Passing |
| **Total** | **30** | **✅ All Passing** |

## 📂 Adding New Tests

### Naming Convention
- Test files: `ComponentName.spec.ts`
- Located in: `tests/unit/components/{category}/{ComponentName}/`

### File Structure
```typescript
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { mountWithI18n } from '../../shared/test-utils';
import ComponentName from '../../../../../src/path/to/ComponentName.vue';

describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });
});
```

## 🔧 Configuration

- **Vitest Config**: `vitest.config.ts`
- **Test Pattern**: `tests/**/*.spec.ts`
- **Environment**: `happy-dom`
- **Globals**: Enabled (no need to import describe, it, expect)

## ✅ Quality Metrics

- ✅ **30 tests** passing (100% pass rate)
- ✅ **0 errors** in test execution
- ✅ **Fast execution**: ~700ms total
- ✅ **Type-safe**: Full TypeScript support
- ✅ **Maintainable**: Clear organization and naming

---

**Last Updated**: November 14, 2025
